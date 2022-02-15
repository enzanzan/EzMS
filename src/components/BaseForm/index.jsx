import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from "antd";
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class FilterForm extends Component {

    // 查询
    handleFilterSubmit = () => {
        let fieldsValue = this.refs.myForm5.getFieldValue();
        console.log(fieldsValue);
        this.props.filterSubmit(fieldsValue);
    }
    //重置
    reset = () => {
        this.refs.myForm5.resetFields();
    }
    // 表单封装
    initFormList = () => {
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let refs = item.refs;
                let label = item.label;
                let field = item.field;
                let initValue = item.initValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                formItemList.push(refs);
                if (item.type === "时间查询") {
                    const begin_time = <FormItem key={field} label="订单时间" name="start_time">
                        <DatePicker showTime={true} placeholder={placeholder} showTime format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false} key={field} name="end_time">
                        <DatePicker showTime={true} placeholder={placeholder} showTime format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(end_time);
                } else if (item.type === "INPUT") {
                    const INPUT = <FormItem label={label} key={field} name={label}>
                        <Input type="text" placeholder={placeholder} />
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (item.type === "SELECT") {
                    const SELECT = <FormItem label={label} key={field} name="select">
                        <Select placeholder={placeholder} style={{ width: width }} initValue={initValue}>
                            {Utils.getOptionList(item.list)}
                        </Select>
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (item.type === "CHECKBOX") {
                    const CHECKBOX = <FormItem label={label} key={field} name="checkbox">
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                } else if (item.type === "DATE") {
                    const Date = <FormItem label={label} key={field} name="datepicker">
                        <DatePicker showTime={true} placeholder={placeholder} showTime format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(Date);
                }
            })
        }
        return formItemList;
    }
    render() {
        return (
            <Form layout="inline" ref="myForm5">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: "0 20px" }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form >
        )
    }
}
