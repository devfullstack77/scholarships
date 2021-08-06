<template>
  <div>
    <v-snackbar
      absolute
      centered
      v-model="snackbar.show"
      shaped
      outlined
      :color="snackbar.type"
      :multi-line="snackbar.multiLine"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-switch
          v-model="switchLocal"
          :label="this.labelSwitch(switchLocal)"
        ></v-switch>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="courses"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:body.prepend>
          <tr>
            <td></td>
            <td>
              <v-text-field
                v-model="name"
                type="String"
                label="Curso"
                maxlength="50"
              >
                <template v-slot:label>
                  <strong>curso</strong>
                  <v-icon style="vertical-align: middle">
                    mdi-file-find
                  </v-icon>
                </template>
              </v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="city"
                type="text"
                label="Cidade"
                maxlength="50"
              >
                <template v-slot:label>
                  <strong>cidade</strong>
                  <v-icon style="vertical-align: middle">
                    mdi-file-find
                  </v-icon>
                </template>
              </v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="price"
                type="number"
                label="Preço"
                maxlength="10"
              >
                <template v-slot:label>
                  <strong>preço</strong>
                  <v-icon style="vertical-align: middle">
                    mdi-file-find
                  </v-icon>
                </template>
              </v-text-field>
            </td>
            <td></td>
          </tr>
        </template>

        <template v-slot:item.university.logo_url="{ item }">
          <v-img
            class="borderImg"
            :contain="true"
            max-width="250"
            max-height="150"
            height="150"
            width="250"
            :src="item.university.logo_url"
          />
        </template>

        <template v-slot:item.full_price="{ item }">
          {{ currencyFormat(item.full_price) }}
        </template>

        <template v-slot:item.details="{ item }">
          <DetailsCourse :details="item"> </DetailsCourse>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import DetailsCourse from "./DetailsCourse.vue";
import coursesService from "../services/coursesService";

export default {
  name: "ListCourses",
  components: { DetailsCourse },
  props: {
    title: String,
  },
  data() {
    return {
      switchLocal: false,
      snackbar: {
        multiLine: true,
        show: false,
        timeout: 1000,
        text: `I'm a multi-line snackbar.`,
        type: "warning",
      },
      listCourses: null,
      name: "",
      price: "",
      city: "",
      loading: true,
      search: "",
      pagination: {
        sortBy: "course.name",
      },
      courses: [],
    };
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    async getListCourses() {
      const list = await coursesService.getList();
      if (list.error) {
        this.snackbar.text = list.error;
        this.snackbar.show = true;
      }
      this.courses = [];
      this.courses = list.courses;
      this.loading = false;
    },
    async getListTestCourses() {
      const list = await coursesService.getTestList();
      this.courses = list.courses;
      this.loading = false;
    },
    labelSwitch(value) {
      return value ? "Consumindo API" : "Obter dados da  API";
    },
  },
  mounted() {
    this.loading = true; // Remover quando for na api
  },
  created() {
    this.getListTestCourses();
  },
  watch: {
    switchLocal: async function () {
      this.loading = true;
      if (this.switchLocal) {
        await this.getListCourses();
      } else this.getListTestCourses();
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Logo",
          value: "university.logo_url",
          align: "left",
          sortable: false,
        },
        {
          text: "Nome do Curso",
          value: "course.name",
          align: "left",
          sortable: true,
          filter: (f) => {
            return (f + "").toLowerCase().includes(this["name"].toLowerCase());
          },
        },
        {
          text: "Cidade",
          value: "campus.city",
          align: "left",
          sortable: true,
          filter: (f) => {
            return (f + "").toLowerCase().includes(this["city"].toLowerCase());
          },
        },
        {
          text: "Preço",
          value: "full_price",
          align: "left",
          sortable: true,
          filter: (f) => {
            return (f + "").toLowerCase().includes(this["price"].toLowerCase());
          },
        },
        {
          text: "Detalhes",
          value: "details",
          align: "left",
          sortable: false,
        },
      ];
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #4442b9;
}

.borderImg {
  border-radius: 6px;
  border: 1px solid rgb(49, 51, 173);
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

.theme--light.v-data-table {
  color: #555;
}

</style>
