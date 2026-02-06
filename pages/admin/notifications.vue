<template>
  <div class="notification">
    <div class="admin_layout_container">
      <div class="title_page">
        <h1>Повідомлення</h1>
      </div>

      <div class="notification_wrapper">
        <div
          v-for="note in noteData"
          :key="note.id"
          :class="{
            activeWarning: note.type === 'WARNING' && note.status === 'NEW',
            activeNote: note.type === 'NOTE' && note.status === 'NEW'
          }"
          class="notification_wrapper_note"
        >
          <div class="note_content">
            <img :src="note.img" alt="icon" />
            <p>{{ note.text }}</p>
          </div>

          <div class="button_group">
            <button
              v-if="note.status === 'NEW'"
              class="accept_btn"
              @click="changeStatusHandler(note.id)"
            >
              ПРОЧИТАНО
            </button>
            <button class="detail_btn">Деталі</button>
            <button class="decline_btn" @click="removeNote(note.id)">ВИДАЛИТИ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// const noteStatus = ref(["READED", "NEW"]);

const noteData = ref([
  {
    id: 1,
    type: "NOTE",
    text: "Нове замовлення",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 2,
    type: "WARNING",
    text: "Товар закінчується",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 3,
    type: "NOTE",
    text: "Нове замовлення",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 4,
    type: "WARNING",
    text: "Товар закінчується",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 5,
    type: "NOTE",
    text: "Нове замовлення",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 6,
    type: "WARNING",
    text: "Товар закінчується",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 7,
    type: "NOTE",
    text: "Нове замовлення",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 8,
    type: "WARNING",
    text: "Товар закінчується",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 9,
    type: "NOTE",
    text: "Нове замовлення",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 10,
    type: "WARNING",
    text: "Товар закінчується",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 11,
    type: "NOTE",
    text: "Нове замовлення",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  },
  {
    id: 12,
    type: "WARNING",
    text: "Товар закінчується",
    status: "NEW",
    img: "/icons/order/delivered.webp"
  }
]);

const changeStatusHandler = (id) => {
  const getNote = noteData.value.find((el) => el.id === id);
  getNote.status = "READED";
};

const removeNote = (id) => {
  console.log("remove");
  noteData.value = noteData.value.filter((el) => el.id !== id);
};

onMounted(() => {
  console.log("mounted");
});

definePageMeta({
  layout: "admin"
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;
.notification {
  width: 100%;
  height: 100%;
  position: relative;
}

.admin_layout_container {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}

.title_page {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0 20px;
  h1 {
    @include mixins.titleText;
  }
}

.notification_wrapper {
  width: 100%;
  height: calc(100vh - 15%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  backdrop-filter: blur(10px);
  padding: 20px 10px 80px;
  background: rgba(255, 255, 255, 0.03);
  overflow-y: scroll;
  gap: 8px;

  &_note {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 169, 214, 0.3);
    width: 100%;
    height: auto;

    p {
      @include mixins.mainText;
    }
  }

  .activeWarning {
    border: 1px solid var(--error-border);
  }

  .activeNote {
    border: 1px solid var(--success-border);
  }

  .note_content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;

    img {
      width: 50px;
      height: 50px;
      aspect-ratio: 1 / 1;
    }
  }

  .button_group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  button {
    @include mixins.subtitleText;
    font-size: 0.75rem;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
  .accept_btn {
    background: var(--success-bg);
    border: 1px solid var(--success-btn-hover);
    transition: all ease 0.3s;

    @media screen and (min-width: 1024px) {
      &:hover {
        background: var(--success-btn-hover);
        transition: all ease 0.3s;
      }
    }

    &:active {
      background: var(--success-btn-active);
      transition: all ease 0.3s;
    }
  }
  .detail_btn {
    background: var(--warning-bg);
    border: 1px solid var(--warning-btn-hover);

    transition: all ease 0.3s;

    @media screen and (min-width: 1024px) {
      &:hover {
        background: var(--warning-btn-hover);
        transition: all ease 0.3s;
      }
    }

    &:active {
      background: var(--warning-btn-active);
      transition: all ease 0.3s;
    }
  }
  .decline_btn {
    background: var(--error-bg);
    border: 1px solid var(--error-btn-hover);

    transition: all ease 0.3s;

    @media screen and (min-width: 1024px) {
      &:hover {
        background: var(--error-btn-hover);
        transition: all ease 0.3s;
      }
    }

    &:active {
      background: var(--error-btn-active);
      transition: all ease 0.3s;
    }
  }
}
</style>
