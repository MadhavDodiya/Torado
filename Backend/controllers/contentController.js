import pageContent from "../data/pageContent.js";

export const getAllContent = (req, res) => {
  return res.status(200).json({ data: pageContent });
};

export const getPageContent = (req, res) => {
  const slug = String(req.params.slug || "").trim().toLowerCase();
  const content = pageContent[slug];

  if (!content) {
    return res.status(404).json({ message: `Content not found for slug: ${slug}` });
  }

  return res.status(200).json({ data: content });
};
