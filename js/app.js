function showList(pageNumber) {
    $arr = $('li.student-item');
    if ($arr.length > 10) {
        $('li.student-item').hide();
        for (var i = 1; i <= 10; i++) {
            if ($arr[10 * pageNumber - i]) {
                $arr[10 * pageNumber - i].style.display = 'list-item';
            };
        };
    };
    
};

function paginateList() {
    $arr = $('li.student-item');
    if ($arr.length > 10) {
        var paginationHTML = '';
        for (var i = 0; i < $arr.length / 10; i++) {
            paginationHTML += `<li><a href="#">${i + 1}</a></li>`
        };
        $pagination = $(`<div><ul>${paginationHTML}</ul></div>`).addClass('pagination');
        $('div.page').append($pagination);
        $('div.pagination ul a')[0].classList.add('active');
        showList(1);
    };
};

function filterList() {
    var searchTerm = $('input').val();
    var searchStudentListHTML = '';
    const message = '<p>Sorry your search returned 0 results. Please try Again</p>'
//mod this code   
    for (var i = 0; i < $defaultList.length; i++) {
        if (defaultList[i].querySelector('h3').textContent.includes(searchTerm) || defaultList[i].querySelector('span.email').textContent.includes(searchTerm)) {
            searchStudentListHTML += defaultList[i].outerHTML; //adds the array item as a string instead of object
        };
    };
    if (searchStudentListHTML.length > 0) { //returns a message if no match can be found
        document.querySelector('ul.student-list').innerHTML = searchStudentListHTML;
    } else {
        document.querySelector('ul.student-list').innerHTML = message;
    };
//end of mode
    paginateList();
};

$defaultList = $('li.student-item');
paginateList();
$('div.page-header').append($('<div class="student-search"><input placeholder="Search for Students..."><button>Search</button></div>'))

$('div.pagination ul a').on('click', (e) => {
    $('div.pagination ul a.active').removeClass('active');
    e.target.classList.add('active');
    var pageNumber = e.target.textContent;
    showList(pageNumber);
});

$('div.student-search button').on('click', (e) => {
    $('div.pagination').remove();
    filterList();
});