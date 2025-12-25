<template>

    <div class="reset">
        <div class="container">

            <div class="reset_content">
                <p class="reset_content_text">
                    Забули пароль? Будь ласка, введіть своє ім'я користувача або адресу електронної пошти. 
                    Ви отримаєте посилання для створення нового пароля електронною поштою.
                </p>
                <div class="reset_content_input">
                    <input type="text" placeholder="Логін чи електронна пошта">
                </div>
                <button class="reset_content_btn">
                    Скинути пароль
                </button>

            </div>
        </div>
    </div>

</template>


<script setup>



</script>


<style lang="scss">

    @use "@/style/mixins.scss" as mixins;

    .reset{
        @include mixins.pageSpacing;

    }

    .reset_content{
        width: 468px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30dvh;
        gap: 32px;

        &_text{
            @include mixins.mainText;
            text-align: start;
        }

        &_input{
            @include mixins.defaultInput;
            width: 100%;
        }

        &_btn{
            @include mixins.accentBtn;
            width: 100%;
        }

        @media screen and (max-width: 1024px) {
            width: 448px;
        }
        @media screen and (max-width: 480px) {
            width: 100%;
        }
    }



</style>