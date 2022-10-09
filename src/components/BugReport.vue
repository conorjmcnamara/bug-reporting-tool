<template>
<div id="app">
    <div class="container">
        <div class="form">
            <h2 class="addBugTitle">Add a Bug</h2>

            <!-- input bug title -->
            <label for="bugTitle">Title:</label>
            <input type="text" id="bugTitle" v-model="bugTitle" placeholder="Bug title..."/>
            
            <!-- input bug description -->
            <label for="bugDesc">Description:</label>
            <input type="text" id="bugDesc" v-model="bugDesc" placeholder="Brief description of the bug..."/>
            
            <!-- add a bug -->
            <button id="addBtn" @click="addBug" class="button addBtn">Add</button>
        </div>

        <!-- display submitted bugs -->
        <div class="submittedBugs">
            <h2>Submitted Bugs</h2>
            <ul>
                <li v-for="bug in sBugs" :key="bug.id" class="submmitedList">
                    <h5 :id="'sID_' + bug.id">ID: {{ bug.id }}</h5>
                    <h3 :id="'sTitle_' + bug.id">{{ bug.title }}</h3>
                    <h5 :id="'sDesc_' + bug.id">{{ bug.desc }}</h5>
                    <button id="resolveBtn" @click="resolveBug(bug.id)" class="button resolveBtn">Resolve</button>
                    <button id="deleteBtn" @click="deleteBug(bug.id)" class="button deleteBtn">Delete</button>
                </li>
            </ul>
        </div>

        <!-- display resolved bugs -->
        <div class="resolvedBugs">
            <h2>Resolved Bugs</h2>
            <ul>
                <li v-for="bug in rBugs" :key="bug.id" class="resolvedList">
                    <h5 :id="'rID_' + bug.id">ID: {{ bug.id }}</h5>
                    <h3 :id="'rTitle_' + bug.id">{{ bug.title }}</h3>
                    <h5 :id="'rDesc_' + bug.id">{{ bug.desc }}</h5>
                </li>
            </ul>
        </div>

    </div>
</div>
</template>
    
<script>    
export default {
    name: 'BugReport',
    data() {
        return {
            totalID: 1,
            sBugs: [], // submitted bugs
            rBugs: [], // resolved bugs
            bugTitle: "",
            bugDesc: "",
        };
    },
        
    methods: {
        // function to add a new bug
        addBug() {
            if (this.bugTitle != "" || this.bugDesc != "") {
                // create a bug object from the HTML form data
                var bugObj = {
                    id: this.totalID,
                    title: this.bugTitle,
                    desc: this.bugDesc,
                };

                this.totalID ++;
                this.sBugs.push(bugObj);

                // reset title and description variables
                this.bugTitle = "";
                this.bugDesc = "";
            }
        },
        
        // function to delete a bug given a passed ID
        deleteBug(id) {
            for (var i=0; i < this.sBugs.length; i++) {
                if (this.sBugs[i].id == id) {
                    this.sBugs.splice(i, 1);
                }
            }
        },
        
        // function to mark a bug as resolved given a passed ID
        resolveBug(id) {
            for (var i=0; i < this.sBugs.length; i++) {
                if (this.sBugs[i].id == id) {
                    this.rBugs.push(this.sBugs[i]);
                    this.sBugs.splice(i, 1);
                }
            }
        },
    },
}
</script>
    
<style scoped>
.container {
    width: 70vw;
    margin-top: 1.5em;
    margin-left: auto;
    margin-right: auto;
}

.form {
    background-color: #deeff4;
    border-radius: 15px;
    padding: 1.5em;
    padding-right: 2.5em;
}

.addBugTitle {
    margin-top: 0;
}

label, input {
    display: block;
    margin-bottom: 0.75em;
}

input {
    width: 100%;
    border: 1px solid gray;
    border-radius: 15px;
    padding: 0.75em;
}

button {
    font-weight: bold;
    height: 2.5em;
    width: 8.5em;
    border: none;
    border-radius: 20px;
    margin-right: 0.75em;
}

.button:hover {
    cursor: pointer;
}

.addBtn {
    background-color: #83c5b9;
}

.resolveBtn {
    background-color: white;
}

.deleteBtn {
    background-color:#ff7c75;
}
    
ul {
    list-style: none;
    margin: 1em 0;
    padding: 0;
}
    
li {
    overflow-wrap: break-word;
    border-radius: 15px;
    margin: 1.25em 0;
    padding: 1em;
}

.submmitedList {
    background-color: #ffd9d2;
}

.resolvedList {
    background-color: #E2F0CB;
}
</style>