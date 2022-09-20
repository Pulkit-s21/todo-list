import './style.css'
import 'tw-elements';

const search = document.querySelector(".search input");
const addForm = document.querySelector(".add");
const taskArea = document.querySelector(".taskArea");

//*Adding new task
addForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stopping the page from reloading on submission

    const taskTitle = addForm.add.value.trim(); // here .add is the name of the input field in the form we have given in HTML and we use the trim method so that if user adds white space then it gets removed and only the text is shown

    // checking is the input is empty of not
    if(taskTitle.length){ // this will result in true is length is > 0 else false
        generateTask(taskTitle);
        addForm.reset();
    }else{
        alert('Please enter a task !');
    }

})

//*creating the tasks dynamically 
function generateTask(taskTitle){
    const newTask = document.createElement('div');

    // cant give space and type like I do in HTML cz then it doesnt work..needs to be in a line
    newTask.innerHTML = 
    `
        <li class="list-group-item md:text-xl text-white flex justify-between p-4 px-8 shadow-md shadow-black">
            <span class="task capitalize cursor-pointer hover:text-slate-200 transition-all">${taskTitle}</span>
                <div class="flex gap-6">
                    <i class="cursor-pointer fa-regular fa-pen-to-square"></i>
                    <i class="cursor-pointer fa-solid fa-trash"></i>
                </div>
        </li>
    `
    taskArea.prepend(newTask);
}

//!deleting tasks
//*we wont attach eventListener to each li cz that will reduce the speed of site, will have to manually attach eventListener everytime new task is added..so we will attach it to the UL and check if wht clicked was trashIcon or not..This is called eventDelegation
taskArea.addEventListener("click", (e) => {
    if(e.target.classList.contains("fa-trash")){
        e.target.parentElement.parentElement.remove(); // we are going above 2 lvls to get the li itself and deleteIt..in course he went 1 lvl up but we have the icons inside another div so we hv to go 2 lvls
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("line-through");
    }
});

//*searching and filtering
search.addEventListener("keyup", () => {
    //toLowercase so that no matter what user enters it always converts the values in lowercase
    const term  = search.value.trim().toLowerCase();
    filterTodos(term);
});

//*filtering the todos
function filterTodos(term){
    // console.log(Array.from(taskArea.children)); taskArea.children returns HTML collection and we need array to apply filter so we chng it
    Array.from(taskArea.children)
    // here we are returning the tasks that dont hv what user has typed because we want to hide those tasks and do nothing to those that matches
    //toLowercase so that no matter what user enters it always compares the values in lowercase
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("hidden"));

    Array.from(taskArea.children)
    // here we are returning the tasks that do hv what user has typed because we want to make those tasks visible again
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("hidden"));
};