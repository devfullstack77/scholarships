<template>
  <div>
    <v-row>
      <v-btn color="primary" dark @click.stop="dialog = true"> Detalhes </v-btn>
    </v-row>

    <v-dialog v-model="dialog" min-width="550px" max-width="850px">
      <v-card-title class="grey lighten-2">
        <h2>Informações do curso</h2>
      </v-card-title>
      <v-main class="pt-1">
        <v-container>
          <v-card class="pa-2 d-flex flex-column mb-12">
            <v-row>
              <v-col cols="6" md="4">
                <v-img
                  class="ma-1 borderImg"
                  :contain="true"
                  max-width="250"
                  max-height="150"
                  height="150"
                  :src="details.university.logo_url"
                />
              </v-col>
              <v-col cols="12" md="8" class="text-left">
                <v-row class="ma-2 ml-0">
                  <strong class="course">{{ details.course.name }} </strong> -
                  {{ details.course.kind + " - " + details.course.level }}
                </v-row>
                <v-row>
                  <v-col cols="6">
                    {{
                      details.university.name +
                      " / Score " +
                      details.university.score
                    }}
                  </v-col>
                  <v-col cols="6">
                    <v-icon> mdi-map-marker </v-icon>
                    {{ details.campus.name + " / " + details.campus.city }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    Preço {{ currencyFormat(details.full_price) }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-main>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DetailsCourse",
  props: {
    details: Object,
  },
  methods: {
    currencyFormat(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scope>
.borderImg {
  border-radius: 6px;
  border: 2px solid rgb(49, 51, 173);
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
.v-card {
  color: #555;
}
</style>
