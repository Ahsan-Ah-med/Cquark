window.addEventListener('scroll', () => {
    const searchBar = document.querySelector('.custom_collection_search_form');
      if (searchBar.getBoundingClientRect().top < 0) {
          searchBar.classList.add('activeSearch')
      } else {
          searchBar.classList.remove('activeSearch')
      }
      
  })