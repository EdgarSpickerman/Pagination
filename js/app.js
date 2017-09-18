//functions
function displayList(results) {
    $arr = $('li.student-item');
    $arr.hide();
    //pagination exist whenever the student amount exceeds the results per page. In this case that is 10.
    if ($arr.length > results) {
        //retrieves which page is requested/clicked
        let activePageLink = $('a.active').html();
        for (var i = 1; i <= results; i++) {
            //checks to see if array index item is valid
            if ($arr[results * activePageLink - i]) {
                $arr[results * activePageLink - i].style.display = 'list-item';
            }
        }
    } else {
        $arr.show();
    }
}

function paginateListBy(results) {
    $arr = $('li.student-item');
    var paginationHTML = '';
    //checks to see if pagination should occur
    if ($arr.length > results) {
        //creates the dynamic pagination html based off results per page.
        for (var i = 0; i < $arr.length / results; i++) {
            paginationHTML += `<li><a href="#">${i + 1}</a></li>`;
        }
        //setting the innerHTML of the the ul element to be the pagination string if present or nothing if pagination doesnt exist.
        $('div.pagination ul').html(paginationHTML);
        $('div.pagination ul a').first().addClass('active');
    } else {
        $('div.pagination ul').html('');
    }
} // 

function searchList() {
    var searchTerm = $('input').val();
    var listHTML = '';
    const message = '<p>Sorry your search returned 0 results. Please try Again</p>';
    for (var i = 0; i < $defaultList.length; i++) {
        //checks to see if search term is included in either email or as student name in the default list.
        if ($defaultList[i].querySelector('h3').textContent.includes(searchTerm) || $defaultList[i].querySelector('span.email').textContent.includes(searchTerm)) {
            listHTML += $defaultList[i].outerHTML; //adds the array item's html as a string instead of object
        }
    }
    $('ul.student-list').html(listHTML.length > 0 ? listHTML : message); //sets the student search results or a message
} //

//variables, element creation and attachement to DOM
$defaultList = $('li.student-item');
$('div.page-header').append($('<div class="student-search"><input placeholder="Search for Students..."><button>Search</button></div>'));
$('div.page').append($('<div class="pagination"><ul></ul></div>'));

//When the webpage first loads.
paginateListBy(10);
displayList(10);

$('div.pagination ul').on('click', (e) => {
    if (e.target.tagName === 'A') {
        $('div.pagination a.active').removeClass('active');
        e.target.classList.add('active');
        displayList(10);
    }
}); //checks to see a link was clicked. If so removes the active class and places it on the clicked link, hides the list and then displays that paginated list to the page.

$('div.student-search button').on('click', (e) => {
    searchList();
    paginateListBy(10);
    displayList(10);
}); //checks to see if a button was clicked. If so filters the student list according to the search term. Hides the search based list. Paginates the new search based list.Displays new search list based off pagination and active link.