import { Directive, Output, EventEmitter, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[ccmMrkdown]',
    host: {
        '(keyup)': 'onKey($event.target.value)'
    }
})
export class MarkDownDirective implements OnInit {

    constructor (private renderer: Renderer2, private element: ElementRef) { }

    @Output() valuechange: EventEmitter<any> = new EventEmitter();


    ngOnInit() {

    }

    onKey(event: KeyboardEvent) {
        let outputObj = {};
        outputObj["input"] = event;
        outputObj["html"] = this.mdToHtml(event);

        this.valuechange.emit(outputObj);
    }
    mdToHtml(str) {
        let tempStr = str;
        while (tempStr.indexOf("**") !== -1) {
            const firstPos: number = tempStr.indexOf("**");
            const nextPos: number = tempStr.indexOf("**", firstPos + 2);
            if (nextPos !== -1) {
                const innerTxt: string = tempStr.substring(firstPos + 2, nextPos);
                const strongified: string = '<strong>' + innerTxt + '</strong>';
                tempStr = tempStr.substring(0, firstPos) + strongified + tempStr.substring(nextPos + 2, tempStr.length);
            } else {
                tempStr = tempStr.replace('**', '');
            }
        }
        while (tempStr.indexOf("[[") !== -1 && tempStr.indexOf("]]") !== -1) {

            const firstPos: number = tempStr.indexOf("[[");
            const nextPos: number = tempStr.indexOf("]]", firstPos + 2);
            if (nextPos !== -1) {
                const innerTxt: string = tempStr.substring(firstPos + 2, nextPos);
                const splitString: Array<string> = innerTxt.split("|");
                const hyperlink: string = `<a href="${splitString[0].trim()}">${splitString[1].trim()}</a>`;
                tempStr = tempStr.substring(0, firstPos) + hyperlink + tempStr.substring(nextPos + 2, tempStr.length);
            } else {
                break;
                // tempStr = tempStr.replace('[[', '');
            }
        }

        while (tempStr.indexOf("//") !== -1) {
            const firstPos = tempStr.indexOf("//");
            const nextPos = tempStr.indexOf("//", firstPos + 1);
            if (nextPos !== -1) {
                const innerTxt = tempStr.substring(firstPos + 1, nextPos);
                const italicized = '<em>' + innerTxt + '</em>';
                tempStr = tempStr.substring(0, firstPos) + italicized + tempStr.substring(nextPos + 2, tempStr.length);

            } else {
                break;
                // tempStr = tempStr.replace('//', '');
            }
        }


        return `<p>${tempStr}</p>`;
    }
}