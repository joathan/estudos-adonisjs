'use strict'

const Post = use("App/Models/Post");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const posts = await Post.query()
      .with("user")
      .fetch();

    return posts
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const data = request.only(["content", "title"]);

    const post = await Post.create({user_id: auth.user.id, ...data});

    return post;
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const post = await Post.findOrFail(params.id)
      return post
    } catch (e) {
      return response.status(404).send({ error: 'Não encontrado' })
    }
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const post = await Post.findOrFail(params.id)
    
    const data = request.only(["content", "title", "user_id"])

    await post.merge(data)
    await post.save()

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)

    // if (post.user_id !== auth.user.id) {
    //   return response.status(401).send({ error: 'Not authorized' })
    // }

    await post.delete()
    return response.status(200).send({ message: 'Deletado com sucesso' })
  }
}

module.exports = PostController
