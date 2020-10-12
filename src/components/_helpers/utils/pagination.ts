const QTD_PER_PAGE = 10

export const transformPaginate = (page, list, totalPerPage = QTD_PER_PAGE) => {
  const docs = list.slice((page - 1) * totalPerPage, page * totalPerPage)

  const lastPage = Math.round(list.length / totalPerPage)

  return {
    docs,
    lastPage,
    currentPage: page,
    totalPerPage,
  }
}