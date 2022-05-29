<script lang="ts" setup>
import { reactive } from 'vue';

const emit = defineEmits<{ (e: 'onSubmit', value: string): void }>();

const UpdateTypeKeyMap: {[type: string]: keyof UpdateShipmentForm} = {
  'created': 'shipmentType',
  'shipped': 'expectedDeliveryTimestamp',
  'delayed': 'expectedDeliveryTimestamp',
  'noteadded': 'note',
  'location': 'location'
}

function formToUpdateString(form: UpdateShipmentForm): string {
  const parts = [];
  parts.push(form.updateType);
  parts.push(form.id);
  parts.push(new Date().getTime());
  if (UpdateTypeKeyMap[form.updateType]) {
    parts.push(form[UpdateTypeKeyMap[form.updateType]]);
  }
  return parts.join(',');
}

const ShipmentUpdateTypes = [
  'created',
  'shipped',
  'delayed',
  'noteadded',
  'canceled',
  'location',
  'lost',
  'delivered',
];

const ShipmentTypes = [
  'standard',
  'express',
  'overnight',
  'bulk'
];

interface UpdateShipmentForm {
  updateType: string;
  id: string;
  shipmentType: string;
  expectedDeliveryTimestamp?: number;
  location?: string;
  note?: string;
}

const form = reactive<UpdateShipmentForm>({
  updateType: 'created',
  id: '',
  shipmentType: 'standard',
});

function onSubmit(e: Event) {
  emit('onSubmit', formToUpdateString(form));
  resetForm();
}

function resetForm() {
  form.updateType = 'created';
  form.id = '';
  form.shipmentType = 'standard';
  form.note = undefined;
  form.location = undefined;
  form.expectedDeliveryTimestamp = undefined;
}
</script>
<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="form-input">
      <label for="status">Shipment Update Type</label><br>
      <select v-model="form.updateType" name="status" id="status">
        <option v-for="o of ShipmentUpdateTypes" :value="o">{{ o }}</option>
      </select>
    </div>

    <div class="form-input">
      <label for="id">Shipment ID</label><br>
      <input type="text" name="id" id="id" v-model="form.id">
    </div>

    <div class="form-input" v-if="form.updateType === 'created'">
      <label for="type">Shipment Type</label><br>
      <select name="type" id="type" v-model="form.shipmentType">
        <option v-for="o of ShipmentTypes" :value="o">{{ o }}</option>
      </select>
    </div>

    <div class="form-input" v-if="form.updateType === 'shipped' || form.updateType === 'delayed'">
      <label for="estimatedDelivery">Expected Delivery Timestamp</label><br>
      <input type="number" name="estimatedDelivery" v-model="form.expectedDeliveryTimestamp">
    </div>

    <div class="form-input" v-if="form.updateType === 'location'">
      <label for="location">Current Location</label><br>
      <input type="text" name="location" v-model="form.location">
    </div>

    <div class="form-input" v-if="form.updateType === 'noteadded'">
      <label for="note">Note</label><br>
      <input type="text" name="note" v-model="form.note">
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
<style lang="scss">
.form-input {
  color: #999999;
  margin: 10px;
}

input[type=radio] {
  margin: 10px;
}
</style>
