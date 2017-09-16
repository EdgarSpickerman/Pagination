//functions
function hideList() {
    var arr = document.querySelectorAll('li.student-item');
    for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = 'none';
    };
};  

function displayList(results) {
    var arr = document.querySelectorAll('li.student-item');
    if (document.querySelector('div.pagination').querySelector('a.active')){
        let pageLink = document.querySelector('div.pagination').querySelector('a.active').textContent;
        var i = 1;
        do {
            if (arr[results * pageLink - i]) {
                arr[(results * pageLink) - i].style.display = 'list-item';
            };
            i++;
        } while (i <= results);
    } else {
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = 'list-item';
        };
    };
}; 

function paginateListBy(groupBy) {
    var arr = document.querySelectorAll('li.student-item');
    var paginationHTML = '';
    if (arr.length > groupBy) {
        for (var i = 0; i < arr.length / groupBy; i++) {
            paginationHTML += `<li><a href="#">${i + 1}</a></li>`;
        };
        document.querySelector('div.pagination').innerHTML = `<ul>${paginationHTML}</ul>`;
        document.querySelector('div.pagination').querySelector('a').classList.add('active');
    } else {
        document.querySelector('div.pagination').innerHTML = '';
    };
};

function searchList() {
    var searchTerm = document.querySelector('div.student-search').querySelector('input').value;
    var searchStudentListHTML = '';
    const message = '<p>Sorry your search returned 0 results. Please try Again</p>'
    for (var i = 0; i < defaultList.length; i++) {
        if (defaultList[i].querySelector('h3').textContent.includes(searchTerm) || defaultList[i].querySelector('span.email').textContent.includes(searchTerm) ) {
            searchStudentListHTML += defaultList[i].outerHTML;
        };
    };
    if (searchStudentListHTML.length > 0) {
        document.querySelector('ul.student-list').innerHTML = searchStudentListHTML;
    } else {
        document.querySelector('ul.student-list').innerHTML = message;
    };
};

const search = document.createElement('div')
const searchInput = document.createElement('input')
const searchButton = document.createElement('button')
const pagination = document.createElement('div');
const defaultList = document.querySelectorAll('li.student-item');

search.classList.add('student-search');
document.querySelector('div.page-header').append(search);
search.append(searchInput);
searchInput.placeholder = 'Search for Students...';
search.append(searchButton);
searchButton.textContent = 'Search';
pagination.classList.add('pagination');
document.querySelector('div.page').append(pagination)
paginateListBy(10);
hideList();
displayList(10);

pagination.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') {
        document.querySelector('div.pagination').querySelector('a.active').classList.remove('active');
        e.target.classList.add('active');
        hideList();
        displayList(10);
    };
});//pagination-link Click event

search.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        searchList();
        paginateListBy(10);
        hideList();
        displayList(10);
    };
}); //student - search Click event