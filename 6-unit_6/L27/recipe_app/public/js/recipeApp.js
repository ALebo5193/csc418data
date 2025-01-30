$.get("/api/courses", (results = {}) => {
  let data = results.data;
  if (!data || !data.courses) return;
  data.courses.forEach((course) => {
  $(".modal-body").append(
 `<div>
 <span class="course-title">
 ${course.title}
 </span>
 <div class='course-description'>
 ${course.description}
 </div>
 </div>`
  );
  });
 });