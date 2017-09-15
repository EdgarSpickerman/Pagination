//functions
function hide(yesOrNo, arr) {
    let arr = document.querySelectorAll('li.student-item');
    for (var i = 0; i < arr.length; i++) {
        if (yesOrNo.toLower() == 'yes') {
            arr[i].style.display = 'none';
        }
    };
};  

function show(results) {
    let arr = document.querySelectorAll('li.student-item');
    if (pagination.querySelector('a.active')) { //checks to see if pagination exists
        let pageLink = pagination.querySelector('a.active').textContent;
        var i = 1;
        do {
            arr[results * pageLink - i].style.display = 'list-item';
            i++;
        } while (i <= results || arr[results * pageLink - i]);
    } else {
        hide('no',arr);
    };
}; 
function paginateBy(groupBY) {
    let arr = document.querySelectorAll('li.student-item');
    var paginationString = '';
    if (arr.length > 10) {
        for (var i = 0; i < arr.length / groupBy; i++) {
            paginationString += `<li><a href="#">${i + 1}</a></li>`;
        };
        pagination.innerHTML = `<ul>${paginationString}</ul>`;
        pagination.querySelector('a').classList.add('active');
    } else {
        pagination.innerHTML = '';
    };
};

function filter() {
    let studentList = document.querySelectorAll('li.student-item'); //contains reference to Default student list.
};

//global variables
const pagination = document.createElement('div');

//attachment, property setting, and creation of new html elements.
    //creation
        
    //properties
    pagination.classList.add('pagination');

    //attachment
    document.querySelector('div.page').append(pagination);

//default behavior expected
paginateBy(10);
hide('yes','defaultList');
show(10);
