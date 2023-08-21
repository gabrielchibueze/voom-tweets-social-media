import { voomsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const textInput = document.getElementById('text-input')
const voomBtn = document.getElementById('voom-btn')
const voomFeed = document.getElementById('voom-feed')

document.addEventListener('click', function(e){
    if(e.target.dataset.reply){
        showReply(e.target.dataset.reply)
    }
    else if (e.target.dataset.like){
        handleLikeClicks(e.target.dataset.like)
    }
    else if(e.target.dataset.revoom){
        handleRevoomClicks(e.target.dataset.revoom)
    }
    else if (e.target.id === 'voom-btn'){
        getVoomtextData()
    }
    // else if(e.target.dataset.revoomreply){
    //     handleRevoomReplyClicks(e.target.dataset.revoomreply)

    // }
    else if (e.target.dataset.revoomlike){
        handleRevoomLikeClicks(e.target.dataset.revoomlike)
    }
    else if(e.target.dataset.revoomrevoom){
        handleRevoomRevoomClicks(e.target.dataset.revoomrevoom)
    }
    render()
})

// get New voom data from input
function getVoomtextData(){

    if(textInput.value.trim().length > 0){
        voomsData.unshift({
            handle: `@Gabby ✅`,
            profilePic: `/images/gabby-icon.png`,
            likes: 0,
            revooms: 0,
            voomText: `${textInput.value}`,
            replies: [
                      {
                    handle: `@Darlington104 ✅`,
                    profilePic: `/images/Gabriel-icon.png`,
                    voomText: `Yes! Sign me up! 😎🛩`,
                },
                      {
                    handle: `@Ozurumba404 ✅`,
                    profilePic: `/images/Gabriel-icon.png`,
                    voomText: `I went last year😴`,
                },
            ],
            isLiked: false,
            isReVoomed: false,
            uuid: uuidv4(),
        })
        render ()
        textInput.value = ''
    }
}

getVoomtextData()
// Handle voom Clicks
function handleLikeClicks(voomId){
    const targetlikedObjects = voomsData.filter(function(voom){
        return voom.uuid === voomId
    })[0]
    if(targetlikedObjects.isLiked){
        targetlikedObjects.likes--
    }
    else {
        targetlikedObjects.likes++
    }
    targetlikedObjects.isLiked = !targetlikedObjects.isLiked
    render()
}

function handleRevoomClicks(voomId){
    const targetRevoomObjects = voomsData.filter(function(voom){
        return voom.uuid === voomId
    })[0]

    if(targetRevoomObjects.isReVoomed){
        targetRevoomObjects.revooms--
    }
    else {
        targetRevoomObjects.revooms++
    }
    targetRevoomObjects.isReVoomed = !targetRevoomObjects.isReVoomed
    render()
}

function showReply(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hide-reply")

}

// Handle Revoom like clicks

function handleRevoomLikeClicks(revoomId) {
    voomsData.forEach(voom => {
        if (voom.replies.length > 0) {
            voom.replies.forEach(reply => {
                if (reply.uuid === revoomId) {
                    reply.likes += reply.isLiked ? -1 : 1;
                    reply.isLiked = !reply.isLiked;
                }
            });
        }
    });
    render();
}

// Handle Revoom revoom cliks
function handleRevoomRevoomClicks(revoomId){
    voomsData.forEach(voom => {
        if (voom.replies.length > 0) {
            voom.replies.forEach(reply => {
                if (reply.uuid === revoomId) {
                    reply.revooms += reply.isReVoomed ? -1 : 1;
                    reply.isReVoomed = !reply.isReVoomed;
                }
            });
        }
    });
    render();
}
// tranfering Voom feeds to html DOM
function getVoomData(){
    
    let feed = ''
    voomsData.forEach(function(voom){     

// main Voom feeds
 
        let voomRepliesHtml = ""
        if(voom.replies.length >0){
            voom.replies.forEach(function(reply){

                let replyLikedClicksIcon = ''
                if(reply.isLiked){
                    replyLikedClicksIcon = 'like'
                }
            
                let replyRevoomClicksIcon = ''
                if (reply.isReVoomed){
                    replyRevoomClicksIcon = 'revoomed'
                }
                voomRepliesHtml += `
            <div class="reply-voom-outer hidden">
                <div class="reply-vooms">
                    <div>
                        <img src="${reply.profilePic}" id="voom-profile-photo" class="voom-profile-photo"/>
                    </div>
                    <div class="revoom-tweets">
                        <p class="voom-handle">
                            ${reply.handle}
                        </p>
                        <p class="revoom-texts">
                            ${reply.voomText}
                        </p>
                        <div class="reply-voom-icons" id="reply-voom-icon">
                            <div class="voom-reply">
                                <i class="fa-regular fa-comment-dots reply" data-revoomreply="${reply.uuid}"></i>
                                ${reply.replies.length}
                            </div>
                            <div class="voom-likes">
                                <i class="fa-solid fa-heart ${replyLikedClicksIcon}" data-revoomlike="${reply.uuid}"></i>
                                ${reply.likes}
                            </div>
                            <div class="voom-revooms">
                                <i class="fa-solid fa-retweet ${replyRevoomClicksIcon}" data-revoomrevoom="${reply.uuid}"></i>
                                ${reply.revooms}
                            </div>
                        </div>          
                    </div>
                </div
            <div>
            `
            })
        }
// main Voom feeds
    let likedClicksIcon = ''
    if(voom.isLiked){
        likedClicksIcon = 'like'
    }

    let revoomClicksIcon = ''
    if (voom.isReVoomed){
        revoomClicksIcon = 'revoomed'
    }
        feed += `
    <div class="voom-outer">
        <div class="main-vooms">
            <div>
                <img src="${voom.profilePic}" id="voom-profile-photo" class="voom-profile-photo"/>
            </div>
            <div class="voom-tweets">
                <p class="voom-handle">
                ${voom.handle}
                </p>
                <p class="voom-texts">
                    ${voom.voomText}
                </p>
                <div class="voom-icons" id="voom-icon">
                    <div class="voom-reply">
                        <i class="fa-regular fa-comment-dots"
                        data-reply="${voom.uuid}"></i>
                        ${voom.replies.length}
                    </div>
                    <div class="voom-likes">
                        <i class="fa-solid fa-heart ${likedClicksIcon}"
                        data-like="${voom.uuid}"></i>
                        ${voom.likes}
                    </div>
                    <div class="voom-revooms">
                        <i class="fa-solid fa-retweet ${revoomClicksIcon}"
                        data-revoom="${voom.uuid}"></i>
                        ${voom.revooms}
                    </div>
                </div>          
            </div>
        </div>
        <div id="replies-${voom.uuid}" class="main-replies hide-reply">
            ${voomRepliesHtml}
        </div>
    </div>
`
    }) 
    return feed
}

function render (){
    voomFeed.innerHTML = getVoomData()
}

render()