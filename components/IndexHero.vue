<template>

    <section class="index_hero">

        <div class="container">

            <div class="hero_content">
                <h1 class="main_text">
                    Секс-девайси про ніжність <br> до тіла, а не про сором.
                </h1>

                <SharedAccentBtn>
                    Обрати девайс
                </SharedAccentBtn>
            </div>


        </div>

    </section>


</template>



<script setup>


</script>



<style lang="scss" scoped>

    .index_hero {

        width: 100%;
        height: 100dvh;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('../public/images/index-img/hero.webp') lightgray 50% / cover no-repeat;
        position: relative;


    }

    .hero_content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 2rem;

    }

    .main_text{
        color: var(--text-color);
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: .8;
        text-transform: uppercase;

        @media screen and (max-width: 1024px) {
            font-size: 2rem;
        }

        @media screen and (max-width: 768px) {
            font-size: clamp(1.5rem, 5vw, 2rem);
        }

        @media screen and (max-width: 480px) {
            font-size: 1.375rem;
        }

        @media screen and (max-width: 375px) {
            font-size: clamp(1rem, 5vw, 1.25rem);
        }
    }



</style>