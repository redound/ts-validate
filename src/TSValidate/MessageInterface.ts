module TSValidate {

    export interface MessageInterface {

        /**
         * Sets message type
         * @param type
         */
        setType(type:string): this;

        /**
         * Returns message type
         */
        getType(): string;

        /**
         * Sets verbose message
         */
        setMessage(message:string): this;

        /**
         * Returns verbose message
         */
        getMessage(): string;

        /**
         * Returns field name related message
         * @param field
         */
        setField(field:string): this;

        /**
         * Returns verbose message
         */
        toString(): string;
    }
}