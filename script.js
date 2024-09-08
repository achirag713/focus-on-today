const checkBoxList= document.querySelectorAll('.custom-checkbox')
const inputFields= document.querySelectorAll('.goal-input')
const progressBar= document.querySelector('.progress-bar')
const progressLabel= document.querySelector('.progress-label')
const progressValue= document.querySelector('.progress-value')

const allQuotes =[
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going',
    'Whoa! You just completed all the goals, time for chill now',
]


const allGoals= JSON.parse(localStorage.getItem('allGoals')) || {}

let completeGoalsCount= Object.values(allGoals).filter((goal)=> goal.completed).length

progressValue.style.width=`${(completeGoalsCount/inputFields.length) * 100}%`
progressValue.firstElementChild.innerText=`${completeGoalsCount}/${inputFields.length} completed`
progressLabel.innerText=allQuotes[completeGoalsCount]

checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click', (e)=>{
        const allGoalsAdded= [...inputFields].every(function (input){
            return input.value
        })

        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed')
            const inputId= checkbox.nextElementSibling.id
            allGoals[inputId].completed=!allGoals[inputId].completed
            completeGoalsCount= Object.values(allGoals).filter((goal)=> goal.completed).length

            progressValue.style.width=`${(completeGoalsCount/inputFields.length) * 100}%`
            progressValue.firstElementChild.innerText=`${completeGoalsCount}/${inputFields.length} completed`
            progressLabel.innerText=allQuotes[completeGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else{
            progressBar.classList.add('show-error')
        }
        
    })
})

inputFields.forEach((input)=> {
    if(allGoals[input.id]){
        input.value= allGoals[input.id].name

        if(allGoals[input.id].completed){
            input.parentElement.classList.add('completed')
        }
    }
    

    

    input.addEventListener('focus', ()=>{
        progressBar.classList.remove('show-error')
    })
    input.addEventListener('input', (e)=>{
        if(allGoals[input.id] && allGoals[input.id].completed){
            input.value=allGoals[input.id].name
            return
        }

        if(allGoals[input.id]){
            allGoals[input.id].name=input.value
        } 
        else{
            allGoals[input.id]={
                name: input.value,
                completed: false
            }
        }
        
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})