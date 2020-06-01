import React from 'react';
import './DragAndDrop.css';

export default class DragAndDropUpload extends React.Component {

    constructor(props) {
        super(props);
        this.dragHandler = this.dragHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            filename: '',
            isOver: false
        }
    }

    dragHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.type)
        if (e.type === 'drop' || e.type === 'dragleave')
            this.setState({ isOver: false })
        else
            this.setState({ isOver: true })
        if (e.type === 'drop' && e.dataTransfer.items.length === 1) {
            var file = e.dataTransfer.files[0];
            if (file)
                this.updateFile(file);
        }
    }

    onChangeHandler(e) {
        this.setState({
            filename: e.target.files[0].name
        });
        if (this.props.onChange)
            this.props.onChange(e);
    }

    render() {
        return (
            <div className={this.state.isOver ? 'upload-box has-advanced-upload is-dragover' : 'upload-box has-advanced-upload'}
                onDrag={this.dragHandler}
                onDragStart={this.dragHandler}
                onDragEnd={this.dragHandler}
                onDragOver={this.dragHandler}
                onDragEnter={this.dragHandler}
                onDragLeave={this.dragHandler}
                onDrop={this.dragHandler}>
                <i aria-hidden='true' className='huge upload icon'></i>
                <div>
                    <input id='file' type='file' multiple={false} required onChange={this.onChangeHandler} />
                    <label htmlFor='file'>{
                        this.state.filename ?
                            (this.state.filename) :
                            (<div>
                                <strong>Selecione um arquivo</strong>
                                <span> ou solte o aqui</span>
                            </div>)
                    }</label>
                </div>
            </div>
        )
    }
}