import mongoose from "mongoose";

import defaultPageContent from "../data/pageContent.js";
import PageContent from "../models/PageContent.js";

const normalizeSlug = (value = "") => String(value).trim().toLowerCase();

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const mergeContent = (base, override) => {
  if (!isPlainObject(base) || !isPlainObject(override)) return override ?? base;

  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseValue = base[key];
    const overrideValue = override[key];
    result[key] =
      isPlainObject(baseValue) && isPlainObject(overrideValue)
        ? mergeContent(baseValue, overrideValue)
        : overrideValue;
  }
  return result;
};

const getStoredContentMap = async () => {
  if (mongoose.connection.readyState !== 1) return {};

  const docs = await PageContent.find().select("slug content updatedAt").lean();
  return docs.reduce((acc, doc) => {
    acc[doc.slug] = { content: doc.content || {}, updatedAt: doc.updatedAt };
    return acc;
  }, {});
};

export const getAllContent = async (req, res, next) => {
  try {
    const storedMap = await getStoredContentMap();
    const combined = {};

    for (const slug of Object.keys(defaultPageContent)) {
      const defaultContent = defaultPageContent[slug] || {};
      const storedContent = storedMap[slug]?.content || {};
      combined[slug] = mergeContent(defaultContent, storedContent);
    }

    for (const slug of Object.keys(storedMap)) {
      if (!combined[slug]) combined[slug] = storedMap[slug].content || {};
    }

    return res.status(200).json({ data: combined });
  } catch (error) {
    return next(error);
  }
};

export const getPageContent = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const defaultContent = defaultPageContent[slug];

    if (!defaultContent && mongoose.connection.readyState !== 1) {
      return res.status(404).json({ message: `Content not found for slug: ${slug}` });
    }

    let storedDoc = null;
    if (mongoose.connection.readyState === 1) {
      storedDoc = await PageContent.findOne({ slug }).select("content").lean();
    }

    if (!defaultContent && !storedDoc?.content) {
      return res.status(404).json({ message: `Content not found for slug: ${slug}` });
    }

    const merged = mergeContent(defaultContent || {}, storedDoc?.content || {});
    return res.status(200).json({ data: merged });
  } catch (error) {
    return next(error);
  }
};

export const getAdminContentList = async (req, res, next) => {
  try {
    const storedMap = await getStoredContentMap();
    const allSlugs = new Set([
      ...Object.keys(defaultPageContent),
      ...Object.keys(storedMap),
    ]);

    const data = [...allSlugs]
      .sort()
      .map((slug) => ({
        slug,
        content: mergeContent(
          defaultPageContent[slug] || {},
          storedMap[slug]?.content || {}
        ),
        updatedAt: storedMap[slug]?.updatedAt || null,
      }));

    return res.status(200).json({ data });
  } catch (error) {
    return next(error);
  }
};

export const getAdminPageContent = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const defaultContent = defaultPageContent[slug] || {};
    const storedDoc =
      mongoose.connection.readyState === 1
        ? await PageContent.findOne({ slug }).select("content updatedAt").lean()
        : null;

    if (!Object.keys(defaultContent).length && !storedDoc?.content) {
      return res.status(404).json({ message: `Content not found for slug: ${slug}` });
    }

    return res.status(200).json({
      data: {
        slug,
        content: mergeContent(defaultContent, storedDoc?.content || {}),
        updatedAt: storedDoc?.updatedAt || null,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const upsertPageContent = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is not connected." });
    }

    const slug = normalizeSlug(req.params.slug);
    const { content } = req.body;

    if (!slug) {
      return res.status(400).json({ message: "slug is required." });
    }

    if (!isPlainObject(content)) {
      return res
        .status(400)
        .json({ message: "content must be a JSON object." });
    }

    const saved = await PageContent.findOneAndUpdate(
      { slug },
      { slug, content },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).select("slug content updatedAt");

    return res.status(200).json({
      message: "Page content saved successfully.",
      data: {
        slug: saved.slug,
        content: mergeContent(defaultPageContent[slug] || {}, saved.content || {}),
        updatedAt: saved.updatedAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const resetPageContent = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is not connected." });
    }

    const slug = normalizeSlug(req.params.slug);
    await PageContent.findOneAndDelete({ slug });

    return res.status(200).json({
      message: "Page content reset to default successfully.",
      data: { slug, content: defaultPageContent[slug] || {} },
    });
  } catch (error) {
    return next(error);
  }
};
