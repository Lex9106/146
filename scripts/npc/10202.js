/*
	NPC Name: 		Dances with Balrog
	Map(s): 		Maple Road : Spilt road of choice
	Description: 		Job tutorial, movie clip
*/

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 1) {
	    cm.sendNext("N�u b�n mu�n tr�i nghi�m nh�ng g� n� gi�ng nh� m�t Chi�n Binh, ��n g�p t�i m�t l�n n�a.");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("C�c chi�n binh c� s�c m�nh to l�n v�i s�c ch�u ��ng �� l�i l�i, v� h� t�a s�ng r�c r� trong m�t t�nh hu�ng c�n chi�n. C�c ��n t�n c�ng th�ng th��ng r�t m�nh �� b�t ��u, v� ���c trang b� c�c k� n�ng ph�c t�p, c�ng vi�c l� ho�n h�o cho c�c cu�c t�n c�ng b�ng n�.");
    } else if (status == 1) {
	cm.sendYesNo("B�n mu�n xem k� n�ng c�a Warrior?");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020100, 0); // Effect/Direction3.img/swordman/Scene00
	cm.dispose();
    }
}