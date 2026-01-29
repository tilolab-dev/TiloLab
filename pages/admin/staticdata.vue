<template>
  <div class="static_section">
    <div class="static_container">
      <div class="top_block">
        <div class="page_name">
          <h1 class="mb-0">Статичні дані</h1>
        </div>
      </div>

      <div class="info_content">
        <div class="info_content_wrapper">
          <div class="wrapper_content">
            <!-- Hero banner -->
            <section>
              <h2>Секція головного баннера</h2>
              <form class="static_section_form">
                <div class="form-group">
                  <label for="hero-banner-title">Заголовок головного баннера</label>
                  <input
                    id="hero-banner-title"
                    v-model="heroBanner.title"
                    type="text"
                    placeholder="Заголовок"
                  />
                </div>
                <div class="form-group">
                  <label for="hero-banner-text">Текст головного баннера</label>
                  <textarea
                    id="hero-banner-text"
                    v-model="heroBanner.text"
                    cols="30"
                    rows="10"
                    placeholder="Текст"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="hero-banner-title">Посилання головного баннера</label>
                  <input
                    id="hero-banner-title"
                    v-model="heroBanner.link"
                    type="text"
                    placeholder="Посилання"
                  />
                </div>

                <button type="submit">Зберегти зміни</button>
              </form>
            </section>

            <!-- Footer banner -->
            <section>
              <h2>Секція баннера футера</h2>
              <form class="static_section_form">
                <div class="form-group">
                  <label for="footer-banner-title">Заголовок баннера футера</label>
                  <input
                    id="footer-banner-title"
                    v-model="footerBanner.title"
                    type="text"
                    placeholder="Заголовок"
                  />
                </div>
                <div class="form-group">
                  <label for="footer-banner-text">Текст баннера футера</label>
                  <textarea
                    id="footer-banner-text"
                    v-model="footerBanner.text"
                    cols="30"
                    rows="10"
                    placeholder="Текст"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="footer-banner-title">Посилання баннера футера</label>
                  <input
                    id="footer-banner-title"
                    v-model="footerBanner.link"
                    type="text"
                    placeholder="Посилання"
                  />
                </div>

                <button type="submit">Зберегти зміни</button>
              </form>
            </section>

            <!-- Promo modal -->
            <section>
              <h2>Секція промо модалки</h2>
              <form class="static_section_form">
                <div class="form-group">
                  <label for="promo-modal-title">Заголовок промо модалки</label>
                  <input
                    id="promo-modal-title"
                    v-model="promoModal.title"
                    type="text"
                    placeholder="Заголовок"
                  />
                </div>
                <div class="form-group">
                  <label for="promo-modal-text">Текст промо модалки</label>
                  <textarea
                    id="promo-modal-text"
                    v-model="promoModal.text"
                    cols="30"
                    rows="10"
                    placeholder="Текст"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="promo-modal-title">Посилання промо модалки</label>
                  <input
                    id="promo-modal-title"
                    v-model="promoModal.link"
                    type="text"
                    placeholder="Посилання"
                  />
                </div>

                <button type="submit">Зберегти зміни</button>
              </form>
            </section>

            <!-- Steps for questionnaire -->
            <section>
              <h2>Секція кроків для анкети</h2>
              <form class="static_section_form">
                <div class="form-group">
                  <label for="steps-for-questionnaire">Кроки для анкети</label>
                  <textarea
                    id="steps-for-questionnaire"
                    v-model="stepsForQuestionnaire"
                    cols="30"
                    rows="10"
                    placeholder="Кроки"
                  ></textarea>
                </div>

                <button type="submit">Зберегти зміни</button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ICONS
import { onMounted, ref } from "vue";

const heroBanner = ref({
  title: "",
  text: "",
  link: ""
});

const footerBanner = ref({
  title: "",
  text: "",
  link: ""
});

const promoModal = ref({
  title: "",
  text: "",
  link: ""
});

const stepsForQuestionnaire = ref("");

definePageMeta({
  layout: "admin"
});

onMounted(async () => {
  // fetch static data
  // heroBanner.value = await $api.get("/static-data/hero-banner");
});
</script>

<style scoped lang="scss">
@use "@/style/mixins.scss" as mixins;
.static_section {
  height: 100vh;
  position: relative;

  .static_container {
    padding-bottom: 2px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .top_block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    .page_name {
      h1 {
        margin-bottom: 5px;
      }
    }
  }

  .info_content {
    width: 100%;
    height: 100%;
    padding: 24px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    &_wrapper {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      position: relative;

      .wrapper_content {
        flex: none;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        border: 1px solid var(--border-color);
        padding: 1.5rem;
        padding-bottom: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        margin-bottom: 1.5rem;
        overflow: auto;
        word-break: break-word;
        background: rgb(6, 5, 6);
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-radius: 1rem;
        background-clip: border-box;

        section {
          h2 {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .form-group {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 15px;
          }

          label {
            margin-bottom: 10px;
          }

          input,
          textarea {
            width: 100%;
            max-width: 600px;
            border: 2px solid var(--border-color);
            border-radius: 4px;
            padding: 5px;
          }

          button {
            width: 100%;
            max-width: 350px;
            align-self: center;
            margin-bottom: 20px;
            white-space: nowrap;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            border: 1px solid var(--border-color);
            background: var(--btn-color);
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }

  &_form {
    display: flex;
    flex-direction: column;
  }
}
</style>
