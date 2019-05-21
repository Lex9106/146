/* 
 * NPC   : Dev Doll
 * Map   : GMMAP
 */

var status = 0;
var invs = Array(1, 5);
var invv;
var selected;
var slot_1 = Array();
var slot_2 = Array();
var statsSel;

function start() {
    status = 0;
    invs = Array(1, 5);
    invv = null;
    selected = null;
    slot_1 = Array();
    slot_2 = Array();
    statsSel = null;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
        var bbb = false;
        var selStr = "T�i c� th� gi�p b�n v�t �� Cash ra ngo�i t�i h�nh l�:\r\n\r\n#b";
        for (var x = 0; x < invs.length; x++) {
            var inv = cm.getInventory(invs[x]);
            for (var i = 0; i <= inv.getSlotLimit(); i++) {
                if (x == 0) {
                    slot_1.push(i);
                } else {
                    slot_2.push(i);
                }
                var it = inv.getItem(i);
                if (it == null) {
                    continue;
                }
                var itemid = it.getItemId();
                if (!cm.isCash(itemid)) {
                    continue;
                }
                bbb = true;
                selStr += "#L" + ((invs[x] * 1000) + i) + "##v" + itemid + "##t" + itemid + "##l\r\n";
            }
        }
        if (!bbb) {
            cm.sendOk("B�n kh�ng c� v�t ph�m cash.");
            cm.dispose();
            return;
        }
        cm.sendSimple(selStr + "#k");
    } else if (status == 2) {
        invv = (selection / 1000) | 0;
        selected = (selection % 1000) | 0;
        var inzz = cm.getInventory(invv);
        if (selected >= inzz.getSlotLimit()) {
            cm.sendOk("Error, please try again.");
            cm.dispose();
            return;
        }
        if (invv == invs[0]) {
            statsSel = inzz.getItem(slot_1[selected]);
        } else if (invv == invs[1]) {
            statsSel = inzz.getItem(slot_2[selected]);
        }
        if (statsSel == null) {
            cm.dispose();
            return;
        }
        cm.sendGetNumber("B�n mu�n v�t #v" + statsSel.getItemId() + "##t" + statsSel.getItemId() + "#.\r\nS� l��ng bao nhi�u?", cm.itemQuantity(statsSel.getItemId()), 1, statsSel.getQuantity());
    } else if (status == 3) {
        if (!cm.dropItem(selected, invv, selection)) {
            cm.sendOk("L�i kh�ng x�c ��nh!");
            cm.dispose();
        } else {
            status = 0;
            action(1, 0, 0);
        }
    }
}