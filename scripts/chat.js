class Cahtroom{
    constructor(room, username){
        this.room = room
        this.username = username
        this.chats = db.collection('chats')
    }

    async addChat(message){
        const now = new Date()
        const chat = {
            message,
            username : this.username,
            room : this.room,
            created_at : firebase.firestore.Timestamp.fromDate(now)
        }
        const response = await this.chats.add(chat)
        return response
    }

    getChats(callback){
        this.chats.onSnapshot( snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type==='added'){
                    callback(change.doc.data())
                }
            })
        })
    }
}

const chatroom = new Cahtroom('gaming', 'shaum')
/* chatroom.addChat('Ola todo mundo')
.then(()=> console.log('Chat Add'))
.catch(err => console.log(err)) */

chatroom.getChats((data)=>{
    console.log(data)
})