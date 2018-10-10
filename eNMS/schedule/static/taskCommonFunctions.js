/*
global
alertify: false
table: false
*/

/**
 * Show the scheduling modal for task.
 * @param {id} id - Task id.
 */
function showTaskModal(id) { // eslint-disable-line no-unused-vars
  $.ajax({
    type: 'POST',
    url: `/schedule/get/${id}`,
    dataType: 'json',
    success: function(properties) {
      if (!properties) {
        alertify.notify('HTTP Error 403 – Forbidden', 'error', 5);
      } else {
        for (const [property, value] of Object.entries(properties)) {
          if (typeof(value) === 'boolean') {
            $(`#${property}`).prop('checked', value);
          } else {
            $(`#${property}`).val(value);
          }
        }
        $('#job').val(properties.job.id);
      }
    },
  });
  $('#scheduling').modal('show');
}

/**
 * Delete a task.
 * @param {id} id - Task id.
 */
function deleteTask(id) { // eslint-disable-line no-unused-vars
  $.ajax({
    type: 'POST',
    url: `/schedule/delete_task/${id}`,
    success: function(result) {
      if (!result) {
        alertify.notify('HTTP Error 403 – Forbidden', 'error', 5);
      } else {
        table.row($(`#${id}`)).remove().draw(false);
        alertify.notify('Task successfully deleted.', 'success', 5);
      }
    },
  });
}

/**
 * Pause a task.
 * @param {id} id - Task id.
 */
function pauseTask(id) { // eslint-disable-line no-unused-vars
  $.ajax({
    type: 'POST',
    url: `/schedule/pause_task/${id}`,
    success: function(result) {
      if (!result) {
        alertify.notify('HTTP Error 403 – Forbidden', 'error', 5);
      } else {
        $(`#pause-resume-${id}`).attr(
          'onclick',
          `resumeTask('${id}')`
        ).text('Resume');
        alertify.notify('Task paused.', 'success', 5);
      }
    },
  });
}

/**
 * Resume a task.
 * @param {id} id - Task id.
 */
function resumeTask(id) { // eslint-disable-line no-unused-vars
  $.ajax({
    type: 'POST',
    url: `/schedule/resume_task/${id}`,
    success: function(result) {
      if (!result) {
        alertify.notify('HTTP Error 403 – Forbidden', 'error', 5);
      } else {
        $(`#pause-resume-${id}`).attr(
          'onclick',
          `pauseTask('${id}')`
        ).text('Pause');
        alertify.notify('Task resumed.', 'success', 5);
      }
    },
  });
}
