import { getEntriesByContentType } from "../../lib/helpers";

export default async function preview(req, res) {

  if (req.query["x-vercel-protection-bypass"] !== 'heoii7G6jztR7vNMKhp9pPj8eUBsHEX9' || !req.query.path) {
    return res.status(401).json({ message: 'Invalid token'})
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getEntriesByContentType("page", "home-page");

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.writeHead(307, { Location: `/posts/${post.slug}` })
  const url = `/`
  res.setHeader('Content-Type', 'text/html')
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`
  )
  res.end()
}
