<template>
  <div>
    <select id="select-product" placeholder="Wybierz produkt"></select>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";

import TomSelect from "tom-select";
import { getProductByName } from "../../api/api";
import "tom-select/dist/css/tom-select.default.css";

const emit = defineEmits(["onChange"]);

onMounted(() => {
  new TomSelect("#select-product", {
    onChange: (value) => emit("onChange", { value }),
    valueField: "id",
    labelField: "name",
    searchField: "name",
    load: function (query, callback) {
      getProductByName(query)
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {
          callback(error);
        });
    },
  });
});
</script>
<style scoped></style>
