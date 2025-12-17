<template>

    <div class="double_range">

        <div class="top_item">
            <div class="description">
                <span>
                    Ціна, грн
                </span>
            </div>
            <div class="value">
                <span>
                    {{ minValue }} - {{ maxValue }}
                </span>
            </div>
        </div>

        <MultiRangeSlider
        
        />

        <div class="values">

            <span id='range1'>{{ minValue }}</span>
            <span> - </span>
            <span id='range2'>{{ maxValue }}</span>

        </div>

    </div>
</template>



<script setup>

    import { ref } from 'vue';

    import MultiRangeSlider from 'vue-multi-range-slider'

    const minValue = ref(0);
    const maxValue = ref(100);


    const rangeSlideHandler = (value) => {

        minValue.value = parseInt(minValue.value);
        maxValue.value = parseInt(maxValue.value);

    }



</script>




<style lang="scss">


</style>