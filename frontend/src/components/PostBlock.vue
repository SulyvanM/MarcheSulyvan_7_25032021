<template>
  <!-- all the posts in loop, will have a unique id 'post-id_XX' -->
  <div :id="'post-id_' + thisPost.id" class="post-block">
    <div class="setting">
      <button
        type="button"
        @click="boxPost.value = 'new-comment_' + thisPost.id"
      >
        Commenter
      </button>
      <span v-if="user.isAdmin === 1 || thisPost.userId == user.id">
        <button
          type="button"
          @click="boxPost.value = 'edit-post_' + thisPost.id"
        >
          Modifier
        </button>
      </span>
      <span v-if="user.isAdmin === 1 || thisPost.userId == user.id">
        <button
          type="button"
          @click="boxPost.value = 'delete-post_' + thisPost.id"
        >
          Supprimer
        </button>
      </span>
    </div>
    <h2 class="title">{{ thisPost.title }}</h2>
    <p class="description">{{ thisPost.desc }}</p>
    <p class="author">
      Par {{ thisPost.username }} le
      {{
        new Date(thisPost.createdAt).toLocaleDateString("fr-FR") +
        " à " +
        new Date(thisPost.createdAt).toLocaleTimeString("fr-FR")
      }}
    </p>
    <section class="post">
      <div class="picture-block">
        <img
          :src="thisPost.imgURL"
          :alt="thisPost.title + ' by ' + thisPost.username"
        />
      </div>
      <div class="comment-block">
        <h3>Commentaire</h3>
        <div
          v-for="(thisComment, index) in allComments[0]"
          :key="(thisComment[0], index)"
        >
          <div>
            <div v-if="thisPost.id === thisComment.postId" class="comment">
              <div class="buttons">
                <button
                  v-if="user.isAdmin || thisComment.authorId === user.id"
                  @click="boxPost.value = 'delete-comment_' + thisComment.id"
                >
                  Supprimer
                </button>
                <button
                  v-if="user.isAdmin || thisComment.authorId === user.id"
                  @click="boxPost.value = 'edit-comment_' + thisComment.id"
                >
                  Modifier
                </button>
              </div>
              <cite
                :title="
                  'Posté le ' +
                  new Date(thisComment.createdAt).toLocaleDateString('fr-FR') +
                  ' à ' +
                  new Date(thisComment.createdAt).toLocaleTimeString('fr-FR')
                "
                ><span class="comment-author">{{ thisComment.author }}: </span>
                <span :id="'commantary_' + thisComment.id">{{
                  thisComment.comment
                }}</span></cite
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PostBlock",
  //retrieves posts and comments from parents.
  props: {
    thisPost: {
      type: Object,
    },
    allComments: {
      type: Array,
    },
  },
  computed: {
    ...mapState(["user", "boxPost"]),
  },
};
</script>

<style scoped lang="scss">
.post-block {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: auto;
  margin-bottom: 30px;
  width: 80%;
  background-color: #181f44d2;
  border-radius: 3px;
  padding: 20px;
  .description {
    text-align: left;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title {
    margin: 0;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .author {
    color: #dcdcdc;
    font-style: italic;
    font-size: 0.8rem;
    text-align: right;
  }
  .setting {
    text-align: center;
    margin-bottom: 15px;
  }
  .post {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .picture-block {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      width: 100%;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.3);
      overflow: hidden;
      padding: 5px;
      margin: 10px 0;
      img {
        max-width: 100%;
        height: 100%;
      }
    }
    .comment-block {
      overflow: hidden;
      width: 100%;
      height: 30px;
      bottom: 0;
      transition: all 500ms ease-in-out;
      height: 200px;
      overflow-y: scroll;
      h3 {
        font-size: 1rem;
        color: #fff;
        margin: 0;
        padding: 5px 15px 10px 15px;
        border-bottom: solid 5px #a93e30;
      }
      .author {
        margin-right: 20px;
        color: #6e82bb;
        font-style: italic;
        font-size: 0.8rem;
      }
      .comment-author {
        padding-right: 5px;
        font-weight: bold;
        font-style: initial;
      }
      .comment {
        position: relative;
        padding: 0 150px 0 10px;
        margin: 10px;
        font-style: normal;
        font-size: 0.9rem;
        color: #ffffff;
        overflow: hidden;
        border-radius: 20px;
        cite {
          font-size: 0.8rem;
          margin-bottom: 20px;
        }
        .buttons {
          position: absolute;
          right: 10px;
          top: 0;
          text-align: center;
          border-radius: 25px;
          overflow: hidden;
          transition-delay: 200ms;
          transition: all 300ms ease-in-out;
          button {
            font-size: .7rem;
            font-weight: bold;
            color: #c9bceb;
            background-color: transparent;
            border: none;
          }
        }
      }
    }
  }
}
</style>
