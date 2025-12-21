<template>

    <section class="index_cta">

        <div class="container">


            <div class="cta_content">

                <h4 class="cta_title">
                    Відкрий свій простір нових <br/> відчуттів.
                </h4>
                <p class="cta_description">
                    Створи власний кабінет — зберігай обране, отримуй тонкі рекомендації 
                    й рухайся у своєму темпі. Тут народжується твій стиль близькості 
                    — особистий, вільний, без зайвого.
                </p>
                <SharedAccentBtn>
                    Приєднатися до нас
                </SharedAccentBtn>


            </div>




        </div>
    </section>


</template>




<script>



</script>



<style lang="scss">

    .index_cta{
        padding-block: 117px;
        position: relative;
        width: 100%;
        height: auto;

        @media screen and (max-width: 1024px) {
            padding-block: 65px;
        }
        @media screen and (max-width: 768px) {
            padding-block: 56px;
        }  
        @media screen and (max-width: 480px) {
            padding-block: 41px;
        } 
    }

    .cta_content{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        max-width: 529px;
        width: 100%;
        height: 100%;
        gap: 22px;
    }

    .cta_title{
        color: var(--text-color);
        font-family: 'Montserrat', sans-serif;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; 
        letter-spacing: 0.6px;
        text-transform: uppercase;

        @media screen and (max-width: 1024px) {
            font-size: 1.75rem;
        }

        @media screen and (max-width: 768px) {
            font-size: clamp(1.5rem, 5vw, 1.75rem);
        }

        @media screen and (max-width: 480px) {
            font-size: clamp(1rem, 5vw, 1.5rem);
        }

        // @media screen and (max-width: 375px) {
        //     font-size: 1.375rem;
        // }

    }

    .cta_description {
        color: var(--text-color);
        font-family: 'Montserrat', sans-serif;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; 
        letter-spacing: 0.36px;
    }



</style>