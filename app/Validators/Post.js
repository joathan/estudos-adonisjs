'use strict'

const { validate } = use('Validator')

class Post {
  get rules () {
    return {
      title: 'required',
      content: 'required'
    }
  }
  
  // get formatter () {
  //   return 'jsonapi'
  // }

  // async fails (errorMessages) {
  //   return this.ctx.response.send(errorMessages)
  // }
  
  get messages() {
    return{
      'title.required': 'Campo {{ field }} é obrigatorio',
      // 'username.unique': 'Usuario ja cadastrado no sistema',
      'content.required': 'Campo {{ field }} é obrigatorio',
      // 'email.email': 'Campo temm que ser um e-mail valido',
      // 'email.unique': 'Email ja cadastrado no sistema',
      // 'password.required': 'Campo senha obrigatorio'
    }
  }
  
  async fails (errorMessages) {
    return this.ctx.response.status(413).send(errorMessages);
  }
}

module.exports = Post
