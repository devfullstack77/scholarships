<template>
  <div class="home ma-6" >
    <ListCourses title="Lista dos cursos" />
  </div>
</template>

<script>
import ListCourses from "@/components/ListCourses.vue";

export default {
  name: "Courses",
  components: { ListCourses },
};
</script>
