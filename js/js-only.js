//functions
function hideList() {
    var arr = document.querySelectorAll('li.student-item'); //selects all student items in student list
    for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = 'none';
    };
};  //selects and turns all student items in student list 'Off'

function displayList(results) {
    var arr = document.querySelectorAll('li.student-item');
    if (pagination.querySelector('a.active')) { //checks to see if pagination exist ie more than 10 students in the student list if
        let pageLink = pagination.querySelector('a.active').textContent;
        var i = 1;
        do {
            if (arr[results * pageLink - i]) { //checks to see if array index item is valid
                arr[(results * pageLink) - i].style.display = 'list-item';
            };
            i++;
        } while (i <= results); //excutes result times(in this case 10).
    } else {
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = 'list-item';
        };
    };
}; //Checks to see if pagination exists (more than 10(results) students). If pagination does exist displays student list based off active paginated link. If pagination doesn't exist turns "On" student items in student List.

function paginateListBy(groupBy) {
    var arr = document.querySelectorAll('li.student-item');
    var paginationHTML = '';
    if (arr.length > groupBy) {
        for (var i = 0; i < arr.length / groupBy; i++) {
            paginationHTML += `<li><a href="#">${i + 1}</a></li>`;
        };
        pagination.innerHTML = `<ul>${paginationHTML}</ul>`;
        pagination.querySelector('a').classList.add('active');
    } else {
        pagination.innerHTML = '';
    };
}; // the student list is grouped in groups of 10. Paginatation is displayed if there are more than 10 students with the first pagiated page becoming the 'active' page.

function searchList() {
    var searchTerm = search.querySelector('input').value;
    var searchStudentListHTML = '';
    const message = '<p>Sorry your search returned 0 results. Please try Again</p>'
    for (var i = 0; i < defaultList.length; i++) {
        //checks to see if search term is included in either email or as student name.
        if (defaultList[i].querySelector('h3').textContent.includes(searchTerm) || defaultList[i].querySelector('span.email').textContent.includes(searchTerm) ) { 
            searchStudentListHTML += defaultList[i].outerHTML; //adds the array item as a string instead of object
        };
    };
    if (searchStudentListHTML.length > 0) { //returns a message if no match can be found
        document.querySelector('ul.student-list').innerHTML = searchStudentListHTML;
    } else {
        document.querySelector('ul.student-list').innerHTML = message;
    };
}; //

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
}); //checks to see a link was clicked. If so removes the active class and places it on the clicked link, hides the list and then displays that paginated list to the page.

search.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        searchList();
        hideList();
        paginateListBy(10);
        displayList(10);
    };
}); //checks to see if a button was clicked. If so filters the student list according to the search term. Hides the search based list. Paginates the new search based list.Displays new search list based off pagination and active link.