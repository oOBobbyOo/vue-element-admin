const title = 'Vue Element Admin'
export default function getPageTitle(pageTitle: string) {
  return pageTitle ? `${pageTitle} - ${title}` : `${title}`
}
