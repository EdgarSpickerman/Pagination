//functions
function showList(pageNumber) {
    $arr = $('li.student-item');
    if ($arr.length > 10) { //checks to see if pagination should exist
        $('li.student-item').hide();

        //checks to make sure the array index exist and turns that item on based on which link the user clicks.
        for (var i = 1; i <= 10; i++) {
            var arrayIndexCheck = 10 * pageNumber - i;
            $arr[arrayIndexCheck] ? $arr[arrayIndexCheck].style.display = 'list-item' : '';
        } 
    } 
}

function paginateList() {
    $('div.pagination').remove();
    $arr = $('li.student-item');
    if ($arr.length > 10) { //checks to see if pagination should exist
        var paginationHTML = '';

        //dynamically create the pagination html to attach to DOM
        for (var i = 0; i < $arr.length / 10; i++) {
            paginationHTML += `<li><a href="#">${i + 1}</a></li>`;
        } 

        //attaches the necessary properties and html to the pagination div as well as attaches pagination div to DOM
        $pagination = $(`<div><ul>${paginationHTML}</ul></div>`).addClass('pagination');
        $('div.page').append($pagination);
        $('div.pagination ul a')[0].classList.add('active'); //targets first pagination link and adds the active class.
        showList(1);
    }
}

function filterList() {
    var searchTerm = $('input').val(); //retrieves the input from the user
    var searchStudentListHTML = '';
    const message = '<p>Sorry your search returned 0 results. Please try Again</p>';

    //checks each student's information (email,name,join...) for the input and generate a new list
    for (var i = 0; i < $defaultList.length; i++) {
        if ($defaultList[i].querySelector('h3').textContent.includes(searchTerm) || $defaultList[i].querySelector('span.email').textContent.includes(searchTerm)) {
            searchStudentListHTML += $defaultList[i].outerHTML;
        }
    }

    //sets the contents of the studenlist to the results of the search or default Message if nothing is found.    
    $('ul.student-list').html(searchStudentListHTML.length > 0 ? searchStudentListHTML : message);
    paginateList();
}

//retrieves the unfiltered list and stores it as a variable
$defaultList = $('li.student-item');

//creates pagination if the student list is greater than 10 students.
paginateList();

//attachees the search bar to the DOM
$('div.page-header').append($('<div class="student-search"><input placeholder="Search for Students..."><button>Search</button></div>'));

//Pagination Click event
$('div.pagination ul a').on('click', (e) => {
    $('div.pagination ul a.active').removeClass('active'); //removes the active class from the DOM
    e.target.classList.add('active'); //attaches active class to the link the user clicks
    var pageNumber = e.target.textContent; //retrieves which link the user clicks and sends to the showList function.
    showList(pageNumber);
    console.log('works');
}); 

//Search button click event
$('div.student-search button').on('click', (e) => {
    filterList();
});