<template>
  <div>
    <h2>Task Statistics</h2>
    <Bar :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: {
    Bar,
  },
  props: {
    completedTasks: {
      type: Number,
      required: true,
    },
    remainingTasks: {
      type: Number,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: ['Completed Tasks', 'Remaining Tasks'],
        datasets: [
          {
            label: 'Tasks',
            backgroundColor: ['#42A5F5', '#66BB6A'],
            data: [this.completedTasks, this.remainingTasks],
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
};
</script>

<style>
/* Optional styles for the chart container */
</style>
