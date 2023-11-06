<template>
    <div>
        <p class="total">Total: {{ data.total }}</p>
        <VChart class="chart" :option="option" />
    </div>
</template>
<script lang="ts">
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from 'vue-echarts';

import { getFeesByCategory } from '@/helpers/fees/getFees';

use([TooltipComponent, LegendComponent, PieChart, TitleComponent, CanvasRenderer])
export default {
    data() {
        return {
            data: []
        }
    },

    computed: {
        option() {
            return {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    show: false
                },
                series: [
                    {
                        name: 'Fees by category',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        title: {
                            show: true,
                            text: this.data.total,
                            textStyle: {
                                color: 'white'
                            }
                        },
                        label: {
                            show: false,
                            position: 'left'
                        },
                        labelLine: {
                            show: true
                        },
                        data: this.data.byCategory
                    }
                ]
            }
        }
    },

    async created() {
        this.data = await getFeesByCategory()
        console.log('feesByCAt', this.data.total);

    },

    components: {
        VChart
    },

    provide: {
        [THEME_KEY]: "dark",
    },
}
</script>
<style lang="scss">
div {
    position: relative;
}

.chart {
    height: 400px;
    z-index: 1;
}

.total {
    color: white;
    position: absolute;
    top: 150px;
    left: calc(50% - 20px);
    z-index: 2;
    width: 50px;
    text-align: center;
    text-overflow: ellipsis;
    word-wrap: break-word;
}
</style>