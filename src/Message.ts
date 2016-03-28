import {MessageInterface} from "./MessageInterface";

export default class Message implements MessageInterface {

    protected _type:string;

    protected _message:string;

    protected _field:string;

    protected _code:number;

    /**
     * Constructor
     * @param message
     * @param field
     * @param type
     * @param code
     */
    public constructor(message:string, field:string, type:string = null, code:number = null) {

        this._message = message;
        this._field = field;
        this._type = type;
        this._code = code;
    }

    /**
     * Sets message type
     * @param type
     */
    public setType(type:string):this {

        this._type = type;
        return this;
    }

    /**
     * Returns message type
     */
    public getType():string {
        return this._type;
    }

    /**
     * Sets verbose message
     */
    public setMessage(message:string):this {
        this._message = message;
        return this;
    }

    /**
     * Returns verbose message
     */
    public getMessage():string {
        return this._message;
    }

    /**
     * Sets field name related message
     * @param field
     */
    public setField(field:string):this {
        this._field = field;
        return this;
    }

    /**
     * Returns field name related message
     */
    public getField():string {
        return this._field;
    }

    /**
     * Returns verbose message
     */
    public toString():string {
        return this._message;
    }
}
