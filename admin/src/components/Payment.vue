<template>
    <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane>
            <span slot="label"><i class="fa fa-cc-visa" aria-hidden="true"></i> VISA</span>
            <h2>VISA Credit/Debit Card Settings</h2>
            <EditForm auth="6ca8bcf86432dbad7198787335e6de988df2caa3c0a1f843067d29a14ad8af8d0355a81fe13"
                      bank="808 玉山銀行"
                      >
            </EditForm>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="fa fa-cc-mastercard" aria-hidden="true"></i> MasterCard</span>
            <h2>Master Credit/Debit Card Settings</h2>
            <EditForm auth="e871c3bfea0660f85309c56ec2ca7433580e8c430fb6e840b01bec6d6330f245604a2b85110"
                      bank="000 測試銀行"
                      >
            </EditForm>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="fa fa-paypal" aria-hidden="true"></i> Paypal</span>
            <h2>Paypal 線上收付設定</h2>
            <EditForm></EditForm>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="fa fa-cc-jcb" aria-hidden="true"></i> JCB</span>
            <h2>JCB 信用卡 收付設定</h2>
            <EditForm></EditForm>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import EditForm from './EditForm.vue'

export default {
    data() {
        return {
            activeName: 'first'
        };
    },
    components: {
        EditForm,
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style>

</style>
