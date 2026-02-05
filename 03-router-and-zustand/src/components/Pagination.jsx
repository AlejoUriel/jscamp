import styles from './Pagination.module.css'

export function Pagination( {currentPage = 1, totalPages = 5, onPageChange}) {
  
  //Generar un array de paginas a mostrar
  const pages = Array.from({length: totalPages}, (_, index) => index + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const stylePrevButton = isFirstPage ? {pointerEvent: 'none', opacity: '0.5'}: {};
  const styleNextButton = isLastPage ? {pointerEvent: 'none', opacity: '0.5'}: {};

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  }

  const handleNextClick = (event) => {
    event.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  }

  const handlePageClick = (page, event) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  const buildPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  return (
    <nav className={styles.pagination}>
      <a href={buildPageUrl(currentPage- 1)} style={stylePrevButton} onClick={handlePrevClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>
      
      {pages.map(page => (
        <a
          href={buildPageUrl(page)}
          key={page}  
          onClick={(event) => handlePageClick(page, event)}
          className={currentPage === page ? styles.isActive : ''}
        >
          {page}
        </a>
      ))}

      <a href={buildPageUrl(currentPage + 1)} style={styleNextButton} onClick={handleNextClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>   
    </nav>
  )
}