# Historias de usuario

## Etapa 1

### Ver cursos disponibles

**Como** estudiante,
**quiero** ver la lista de cursos disponibles,
**para** elegir el que más me interese o necesite aprender.

**Criterios de aceptación:**

- **Given** que el estudiante accede a la pantalla de cursos, **When** la aplicación carga, **Then** se muestran todos los cursos disponibles.

- **Given** que existen filtros (nivel, categoría), **When** el estudiante los selecciona, **Then** la lista de cursos se actualiza según el filtro.

- **Given** que el estudiante pulsa sobre un curso, **When** selecciona “ver detalles”, **Then** accede a la descripción completa del curso.

### Roadmap del curso

**Como** estudiante,
**quiero** visualizar el roadmap de cada curso,
**para** entender el recorrido de aprendizaje y avanzar de forma organizada.

**Criterios de aceptación:**

- **Given** que el estudiante entra en un curso, **When** se carga la pantalla, **Then** se muestra un roadmap con los módulos y clases en orden.

- **Given** que el estudiante ha completado una clase, **When** revisa el roadmap, **Then** esa clase aparece marcada como completada.

- **Given** que el estudiante intenta acceder a una clase bloqueada, **When** todavía no ha completado la anterior, **Then** la aplicación le indica que debe completar la previa.

### Clases en formato interactivo

**Como** estudiante,
**quiero** realizar clases con ejercicios interactivos y dinámicos,
**para** aprender de manera práctica y divertida.

**Criterios de aceptación:**

- **Given** que el estudiante abre una clase, **When** esta se carga, **Then** se muestran explicaciones y ejercicios interactivos.

- **Given** que el estudiante responde un ejercicio, When la respuesta es correcta, Then recibe retroalimentación positiva inmediata.

- **Given** que el estudiante responde incorrectamente, **When** falla, **Then** recibe una explicación y la opción de volver a intentar.

## Etapa 2

### Ver progreso personal y el de los demás

**Como** usuario activo de mi app,
**quiero** ver mi progreso y el de mis contactos,
**para** motivarme, comparar mis avances y mantener la constancia en mi aprendizaje.

**Criterios de aceptación:**

- **Given** que el estudiante entra a “Mi progreso”, **When** la pantalla carga, **Then** se muestra un porcentaje de avance en cada curso.

- **Given** que el estudiante completa una clase, **When** revisa su progreso, **Then** el porcentaje aumenta automáticamente.

- **Given** que el estudiante accede al ranking, **When** la pantalla carga, **Then** se muestra la lista de estudiantes ordenados por puntos.

### Bonificaciones / recompensas

**Como** estudiante,
**quiero** recibir bonificaciones (puntos, medallas o logros) al avanzar en los cursos,
**para** mantenerme motivado en mi proceso de aprendizaje.

**Criterios de aceptación:**

- **Given** que el estudiante completa un módulo, **When** finaliza, **Then** recibe puntos automáticamente.

- **Given** que el estudiante logra hitos importantes (primer curso, 5 retos completados), **When** ocurre, **Then** recibe una medalla o logro.

- **Given** que el estudiante acumula puntos, **When** revisa su perfil, **Then** puede visualizar todas sus recompensas.

### Notificaciones de avance

**Como** estudiante, **quiero** recibir notificaciones sobre mis logros y recordatorios de estudio, **para** no perder el ritmo de aprendizaje.

**Criterios de aceptación:**

- **Given** que el estudiante completa un curso, **When** lo logra, **Then** recibe una notificación de felicitación.

- **Given** que el estudiante no entra a la app en varios días, **When** se cumplen 3 días, **Then** recibe una notificación recordándole continuar.

- **Given** que el estudiante alcanza un logro, **When** ocurre, **Then** recibe una notificación emergente dentro de la app.

## Etapa 3

### Login

**Como** persona interesada en aprender programación,
**quiero** registrarme fácilmente en la aplicación,
**para** poder crear mi perfil y comenzar a practicar lecciones aplicadas.

**Criterios de aceptación:**

- **Given** que el estudiante ingresa usuario y contraseña válidos, **When** hace clic en "Iniciar sesión", **Then** accede a la pantalla principal.

- **Given** que el estudiante ingresa credenciales incorrectas, **When** intenta iniciar sesión, **Then** recibe un mensaje de error.

- **Given** que el estudiante olvidó su contraseña, **When** selecciona “Olvidé mi contraseña”, **Then** recibe un correo para restablecerla.


### Evaluación del aprendizaje

**Como** aprendiz de programación en la app,
**quiero** ser evaluado mediante ejercicios y pruebas,
**para** conocer mi nivel real, reforzar mis debilidades y entender mis avances.

**Criterios de aceptación:**

- **Given** que el estudiante termina una clase, **When** avanza, **Then** aparece una evaluación obligatoria.

- **Given** que el estudiante obtiene un puntaje mínimo, **When** completa la evaluación, **Then** puede continuar al siguiente módulo.

- **Given** que el estudiante no alcanza el puntaje mínimo, **When** finaliza la evaluación, **Then** recibe retroalimentación y puede volver a intentarlo.
