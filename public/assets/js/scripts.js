"use strict";

/* JQUERY EXTENDS FUNCTIONS */
// form serialize
$.fn.serializeObject = function (sanitize = true, unmask = []) {
  const self = $(this);
  const disabled = self.find(':input:disabled').removeAttr('disabled');
  let data = {};

  $.each(this.serializeArray(), function () {
    let value = this.value !== undefined ? this.value : null;

    // sanitize
    if (sanitize && value) {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        value = num;
      }
    }

    if (this.name.endsWith('[]')) {
      const key = this.name.slice(0, -2);
      if (!data[key]) data[key] = [];
      data[key].push(value);
    } else if (unmask === true || unmask.includes(this.name)) {
      data[this.name] = self.find(`[name=${this.name}]`).cleanVal();
    } else {
      data[this.name] = value;
    }
  });
  disabled.attr('disabled', 'disabled');
  return data;
};


$(function () {
  // List Organization
  $(document).on('click', '[lead-row] [btn-remove]', function () {
    const self = $(this);
    const id = self.closest('[lead-row]').attr('data-id');
    $.post('/api/lead/delete', { id }, function(response) {
      if (response.error) {
        toastr.error('Não foi possível inserir os dados, porfavor tente novamente.', 'Erro');
      } else {
        window.location.href = '/leads';
      }
    }).fail(function() {
      toastr.warning('O serviço está temporariamente indisponível.', 'Atenção');
    });
  });

  // List Organization
  $(document).on('click', '[organization-row] [btn-remove]', function () {
    const self = $(this);
    const id = self.closest('[organization-row]').attr('data-id');
    $.post('/api/organization/delete', { id }, function(response) {
      if (response.error) {
        toastr.error('Não foi possível inserir os dados, porfavor tente novamente.', 'Erro');
      } else {
        window.location.href = '/organizations';
      }
    }).fail(function() {
      toastr.warning('O serviço está temporariamente indisponível.', 'Atenção');
    });
  });
  /// Create Organization
  $(document).on('click', '[ui-remove]', function () {
    $(this).closest('.input-group').remove();
  });
  $(document).on('click', '[ui-add-mail]', function () {
    $(this).parent().prev().append('<div class="input-group col-md-12 m-1"><input type="text" class="form-control" name="emails[]" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required><div class="input-group-append"><button class="btn btn-danger" type="button" ui-remove><i class="fas fa-trash"></i></button></div></div>');
  });
  $(document).on('click', '[ui-add-phone]', function () {
    $(this).parent().prev().append('<div class="input-group col-md-12 m-1"><input type="text" class="form-control" name="phones[]" length="15" pattern=".{15}" phone-mask required><div class="input-group-append"><button class="btn btn-danger" type="button" ui-remove><i class="fas fa-trash"></i></button></div></div>');
    $('[phone-mask]').mask('(00) 00000-0000');
  });
  // addresses list - add, remove, edit
  let addresses = window.form_addresses || [];
  $(document).on('change', '[ui-select-address]', function() {
    const form = $('#form-address');
    const select = $(this);
    const data = addresses[select[0].selectedIndex];
    if (data) {
      form.find('[name=country]').val(data.country);
      form.find('[name=state]').val(data.state);
      form.find('[name=postalCode]').val(data.postalCode);
      form.find('[name=city]').val(data.city);
      form.find('[name=address]').val(data.address);
      form.find('[name=number]').val(data.number);
      form.find('[name=complement]').val(data.complement);
    }
  });
  $(document).on('click', '[ui-add-address]', function () {
    const form = $('#form-address');
    const select = $('[ui-select-address]');
    const data = form.serializeObject();
    addresses.push(data);
    select.append(`<option>${data.address}</option>`);
    form.trigger('reset');
  });
  $(document).on('click', '[ui-remove-address]', function () {
    const form = $('#form-address');
    const select = $('[ui-select-address]');
    const count = select.find('option').length;
    if (form.attr('data-type') === 'edit' && count === 1) {
      alert('Não é possível remover o ultimo!');
      return;
    }
    if (count > 0) addresses.splice(select[0].selectedIndex, 1);
    form.trigger('reset');
    select.empty()
    addresses.forEach((item) => {
      select.append(`<option>${item.address}</option>`);
    });
  });
  $(document).on('click', '[ui-edit-address]', function () {
    const select = $('[ui-select-address]');
    const index = select[0].selectedIndex;
    if (select.find('option').length > 0) {
      const form = $('#form-address');
      const data = form.serializeObject();
      addresses[index] = data; 
    }
    select.empty()
    addresses.forEach((item) => {
      select.append(`<option>${item.address}</option>`);
    });
    select.find('option').eq(index).prop('selected', true);
  });

  // Form submit edit/create
  $('#form-organization').on('submit', function (e) {
    e.preventDefault();
    const self = $(this);
    const link = self.attr('action');
    const data = { addresses, ...self.serializeObject() };
    // console.log(data);
    $.post(link, data, function(response) {
      if (response.error) {
        toastr.error('Não foi possível inserir os dados, porfavor tente novamente.', 'Erro');
      } else {
        window.location.href = '/organizations';
      }
    }).fail(function() {
      toastr.warning('O serviço está temporariamente indisponível.', 'Atenção');
    });
  });

  // Form submit edit/create
  $('#form-lead').on('submit', function (e) {
    e.preventDefault();
    const self = $(this);
    const link = self.attr('action');
    const data = { addresses, ...self.serializeObject() };
    $.post(link, data, function(response) {
      if (response.error) {
        toastr.error('Não foi possível inserir os dados, porfavor tente novamente.', 'Erro');
      } else {
        window.location.href = '/leads';
      }
    }).fail(function() {
      toastr.warning('O serviço está temporariamente indisponível.', 'Atenção');
    });
  });

  // Input Events
  $(document).on('keyup', 'input, textarea', function (e) {
    const self = $(this);
    const pattern = self.attr('validate') || self.attr('pattern');
    if (pattern !== undefined) {
      if (new RegExp(pattern, 'g').test(self.val())) {
        self.addClass('is-valid');
      } else {
        self.removeClass('is-valid');
      }
    } else {
      self.addClass('is-valid');
    }
  });

});
