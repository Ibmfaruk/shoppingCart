// variables 
const courses = document.querySelector("#courses-list"),
      shoppingCartContent = document.querySelector("#cart-content tbody"),
      ClearCartBtn = document.querySelector("#clear-cart");




// event listeners

loadEventListeners()

function loadEventListeners() {
    courses.addEventListener("click", buyCourse)
    shoppingCartContent.addEventListener("click", removeCourse)
    ClearCartBtn.addEventListener("click", clearCart)
    document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}



// function

function buyCourse(e){
    e.preventDefault();
    if(e.target.classList.contains("add-to-cart")){
        // read the course value
        const course = e.target.parentElement.parentElement;
        
        // read the values
        alert("New Course will be added to cart !!")
        getCourseInfo(course);
    } // use e delegation to specify what you want

}
// get html info on cart
function getCourseInfo(course){
    // create an object with course data
    const courseInfo = {
        image: course.querySelector("img").src,
        title: course.querySelector("h4").textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector("a").getAttribute("data-id")
    }
    // this inserts into the shopping cart
    addInfoCart(courseInfo);
}
// display the selected course into the cart
function addInfoCart(course) {
    // create tr
    const row = document.createElement("tr");

    // build the template
    row.innerHTML = `
        <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
        </tr>
    `;
    shoppingCartContent.appendChild(row);
    // save 2 storage 
    saveIntoStorage(course);
}

function saveIntoStorage(course){
     let courses = getCourseFromStorage();

     // add course into ARRAY
     courses.push(course);


     // convert JSON into string
     localStorage.setItem("courses", JSON.stringify(courses) );
     
}

function getCourseFromStorage(){
    
        let courses;


    // if something exist on storage then we get the value, otherwise create an empty string
    if(localStorage.getItem("courses") === null){
        courses = [];
    } else {
       courses = JSON.parse(localStorage.getItem("courses")); 
    }
   return courses;


}


function localStorageOnLoad() {
    let coursesLs = getCourseFromStorage();


    coursesLs.forEach(function (course){
        
     // create 
     const row = document.createElement("tr");
     row.innerHTML = `
     <tr>
             <td>
                 <img src="${course.image}" width=100>
             </td>
             <td>${course.title}</td>
             <td>${course.price}</td>
             <td>
                 <a href="#" class="remove" data-id="${course.id}">X</a>
             </td>
     </tr>
       
       `;
        shoppingCartContent.appendChild(row);
     
     
    })}


// function remove course
function removeCourse(e){
    let course, courseId;
    if(e.target.classList.contains("remove")){
        reList = e.target.parentElement.parentElement
        reList.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
     // remove from the local storage
     alert("A Course will be deleted from cart !!")
     removeCourseLocalStorage(courseId);
}
// remove from local storage
function removeCourseLocalStorage(id) {
    // get the local storage data
    let coursesLs = getCourseFromStorage();

    // loop trought the array and find the index to remove
    coursesLs.forEach(function(courseLS, index) {
         if(courseLS.id === id) {
            coursesLs.splice(index, 1);
         }
    });

    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLs));
}

//clear cart
function clearCart(e){
    // shoppingCartContent.innerHTML = "";
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    clearLocalStorage();
}
// Clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}
