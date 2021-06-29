document.querySelector(".button-container").addEventListener("click",()=>{
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs=>{
        let filteredjobs = filterJobs(jobs,text);
        let counts=showJobs(filteredjobs);
        console.log("Actual countis ", counts);
        // document.querySelector(".jobs-list").innerHTML = "Showing "+"d"+ "jobs";
        if(counts==1 || counts==0)
        {
            document.querySelector(".job-count").innerHTML = "Showing the " + `${counts}` + " Job";
        }
        else{
        document.querySelector(".job-count").innerHTML="Showing the "+`${counts}`+" Jobs";
        }
    })
    console.log(`"${counts}"`+"jobs");
    console.log("what is the text",text);
})

function getJobs(){
    return fetch("data.json").then(response =>response.json())
    .then(data => {
        console.log(data);
        return data;
    })
}


function showJobs(jobs){
    console.log("Jobs in showJobs",jobs);
    let jobsContainer = document.querySelector(".jobs-container");
    console.log(jobsContainer);
    let jobsHTML = "";
    let count=0;
    jobs.forEach(job => {
        jobsHTML +=`<div class="job-tile">
                <div class="top">
                    <img src="${job.logo}"
                        alt="">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button-apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>`
        count=count+1;
    });
    jobsContainer.innerHTML = jobsHTML;
    console.log("Here is count ", count);
    return count;
}

// Here jobs is an object


getJobs().then(data =>{
    showJobs(data);
});

// getJobs().then() will only get the data when the promise is fullfilled by the fetch function


function filterJobs(jobs,searchText){
    if(searchText){
        let filteredItems = jobs.filter(job=>{
            if(job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText)|| job.company.toLowerCase().includes(searchText)|| job.requirements.content.toLowerCase().includes(searchText)){
                return true
                ;
            }
            else{
                return false;
            }
        })
        return filteredItems;
    }
    else{
        return jobs;
    }
}