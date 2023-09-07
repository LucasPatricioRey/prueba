swal.fire({
    title: 'Registro',
    input: 'text',
    text: 'Escribe tu nombre para entrar al chat',
    inputValidator: value => {
        return !value.trim() && 'Please, write a valid username'
    },
    allowOutsideClick: false

}).then(result => {
    let user = result.value
    document.getElementById('username').innerHTML = user
    let socket = io()

    let chatbox = document.getElementById('chatbox')
    chatbox.addEventListener('keyup', e=> {
        if (e.key ==='Enter'){
            if(chatbox.value.trim().length > 0) {
                socket.emit('message', {
                    user,
                    message: chatbox.value
                })
                chatbox.value = ""
            }
        }
    })

    socket.on('logs', data => {
        const divLogs = document.getElementById('log')
        let messages = ' '
        data.forEach(message => {
            messages += `<p><i>${message.user}</i>: ${message.message}</p>`
        })
        divLogs.innerHTML = messages
    })
})