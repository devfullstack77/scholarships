<template>
  <v-app light>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="../public/logo.png"
          transition="scale-transition"
          width="60"
        />
      </div>
      <label class="logo"> Scholar Ships </label>

      <v-spacer> </v-spacer>
    </v-app-bar>

    <v-main>
      <div id="nav">
        <router-link to="/">Cursos</router-link> |
        <router-link to="/Vue">Vue + Vuetify</router-link> |
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>

<style scope>
#app {
  font-family: Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-decoration-color: #555;
  color: rgb(228, 15, 15);
}
.v-main {
  background-color: #eee;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #4ea742;
}

.logo {
  color: #e3ebec;
  font-weight: bold;
  font-size: 2em;
}
h1 {
  color: #18acc4;
}
h2 {
  color: #007a8d;
}
</style>
