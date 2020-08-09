<template>
  <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">客戶資料</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-unstyled">
            <li class="pb-1">姓名：{{ client.name }}</li>
            <li class="pb-1">信箱：{{ client.email }}</li>
            <li class="pb-1">電話：{{ client.tel }}</li>
            <li>地址：{{ client.address }}</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-info" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['client'],
};
</script>
