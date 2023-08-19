if(window.location.href.indexOf('light') != -1){
    fontcolor = '#000'
    bgccolor = '#fff'
}else if (window.location.href.indexOf('dark') != -1){
    fontcolor = '#fff'
    bgccolor = '#000'
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var allProgram = []
var currentIndex = 0

function flushNameList() {
    var names = []
    //读取storage里的所有数据,并存到allProgram数组里
    chrome.storage.sync.get(null, function (items) {
        console.log(items);
        for (var key in items) {
            allProgram.push({ [key]: items[key] })
            names.push(key)
        }
        document.querySelector('#myul').remove()
        nameList(names)
    });

}

async function nameList(obj) {
    console.log(0);
    var button = document.createElement("ul");
    button.style.width = '200px';
    button.style.maxHeight = '15em';

    //给ul加上滚动条
    button.style.overflow = "auto";
    //让ul列表紧凑点
    button.style.padding = "5px";
    //取消li前边的缩进
    button.style.paddingLeft = "0px";
    button.id = 'myul'
    //取消默认样式
    button.style.listStyle = "none";
    button.style.color = "#fff"
    button.style.backgroundColor = "transparent"
    //显示在最上层
    console.log(2);
    button.style.zIndex = 9999;
    button.style.position = "absolute";
    button.style.top = "113%";
    button.style.left = "0px";
    button.style.color = "black";
    button.style.fontSize = "15px";
    button.style.borderRadius = "3px";
    //当鼠标进入这个ul时，显示下拉列表
    button.onmouseover = function () {
        sh = 1
    }

    button.onmouseout = function () {
        sh = 0
        setTimeout(function () {
            if (sh == 0) {
                button.style.display = 'none'
            }
        }, 100)
    }

    //设置一像素的黑色边框
    button.style.border = "1px solid #808080";
    button.style.display = 'none'
    button.style.backgroundColor = bgccolor

    var i = document.querySelector('#div2')
    i.style.position = "relative";
    console.log(1);
    for (var j = 0; j < obj.length; j++) {
        var li = document.createElement("li");
        li.style.padding = "0px";
        //取消li前边的缩进
        li.style.paddingLeft = "0px";
        li.style.color = fontcolor
      
        li.style.backgroundColor = bgccolor
        li.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#808080";
        });
        li.addEventListener("mouseout", function () {
            this.style.backgroundColor = bgccolor;
        });
        li.addEventListener("click", async function () {

            document.querySelector('#myul').style.display = 'none'
            console.log(this.innerText);
            document.querySelector('#programName').value = this.innerText
            //找到此方案的数据
            for (var i = 0; i < allProgram.length; i++) {
                if (Object.keys(allProgram[i]) == this.innerText) {
                    currentIndex = i
                    await setValue(allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].a, '#script_txt2txt_xyz_plot_x_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input')
                    await setValue(allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].b, '#script_txt2txt_xyz_plot_y_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input')
                    await setValue(allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].c, '#script_txt2txt_xyz_plot_z_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input')
                    document.querySelector('#script_txt2txt_xyz_plot_x_values > label > textarea').value = allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].v1
                    document.querySelector('#script_txt2txt_xyz_plot_y_values > label > textarea').value = allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].v2
                    document.querySelector('#script_txt2txt_xyz_plot_z_values > label > textarea').value = allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].v3
                    break
                }
            }
        });
        li.innerHTML = obj[j];
        button.appendChild(li);
    }



    i.appendChild(button);
    console.log(3);
}

var sh = 0
setInterval(() => {
    console.log('length:' + allProgram.length);
}, 2000);

async function addbtn() {

    var btn = document.createElement("BUTTON");
    btn.innerHTML = "切换";
    btn.id = 'btn'
    btn.style.flex = '1'
    btn.style = "display:none";
    btn.onclick = async function () {
        if (allProgram.length == 0) {
            alert('没有可切换的方案')
            return
        }
        if (currentIndex >= allProgram.length) {
            currentIndex = 0
        }
        document.querySelector('#programName').value = Object.keys(allProgram[currentIndex])[0]
        await setValue(allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].a, '#script_txt2txt_xyz_plot_x_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input')
        await setValue(allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].b, '#script_txt2txt_xyz_plot_y_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input')
        await setValue(allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].c, '#script_txt2txt_xyz_plot_z_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input')
        document.querySelector('#script_txt2txt_xyz_plot_x_values > label > textarea').value = allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].v1
        document.querySelector('#script_txt2txt_xyz_plot_y_values > label > textarea').value = allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].v2
        document.querySelector('#script_txt2txt_xyz_plot_z_values > label > textarea').value = allProgram[currentIndex][Object.keys(allProgram[currentIndex])[0]].v3
        currentIndex++

    }

    var btn1 = document.createElement("BUTTON");
    btn1.innerHTML = "保存";
    btn1.id = 'btn1'
    btn1.style.flex = '1'

    btn1.onclick = function () {
        if (document.querySelector('#programName').value == '') {
            alert('请输入方案名称')
        } else if (this.innerHTML == '保存') {
            //如果方案名称已经存在，则不保存
            for (var i = 0; i < allProgram.length; i++) {
                if (Object.keys(allProgram[i])[0] == document.querySelector('#programName').value) {
                    alert('方案名称已存在')
                    return
                }
            }
            var a = document.querySelector('#script_txt2txt_xyz_plot_x_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input').value
            var b = document.querySelector('#script_txt2txt_xyz_plot_y_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input').value
            var c = document.querySelector('#script_txt2txt_xyz_plot_z_type > label > div > div.wrap-inner.svelte-aqlk7e > div > input').value
            var v1 = document.querySelector('#script_txt2txt_xyz_plot_x_values > label > textarea').value
            var v2 = document.querySelector('#script_txt2txt_xyz_plot_y_values > label > textarea').value
            var v3 = document.querySelector('#script_txt2txt_xyz_plot_z_values > label > textarea').value

            var data = { a, b, c, v1, v2, v3 }

            allProgram.push({ [document.querySelector('#programName').value]: data })
            console.log(data);
            var data = data
            //存储到chrome storage里边
            chrome.storage.sync.set({ [document.querySelector('#programName').value]: data }, function () {
                console.log('保存成功');
                flushNameList()
            });
        }
    }

    var btn3 = document.createElement("BUTTON");
    btn3.innerHTML = "导出";
    btn3.id = 'btn3'
    btn3.style.flex = '1'

    btn3.onclick = function () {
        if (this.innerHTML != '导出') {
            return;
        }
        //从Chrome storage中取出所有数据
        chrome.storage.sync.get(null, function (items) {
            console.log(items);
            var data = JSON.stringify(items)
            //创建一个a标签
            var a = document.createElement('a');
            //创建一个单击事件
            var event = new MouseEvent('click');
            //设置a标签的href属性
            a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
            //设置a标签的download属性，设置下载文件的文件名
            a.download = 'data.json';
            //触发a标签的单击事件
            a.dispatchEvent(event);

        });
    }
    var btn2 = document.createElement("BUTTON");
    btn2.innerHTML = "删除";
    btn2.id = 'btn2'
    btn2.style.flex = '1'

    btn2.onclick = function (event) {
        if (document.querySelector('#programName').value.trim() == '') {
            alert('请输入方案名称')
            return
        }
        if (allProgram.length == 0) {
            alert('没有可删除的方案')
            return
        }
        if (document.querySelector('#programName').value == '' && this.innerHTML == '删除') {
            alert('请输入方案名称1')
        } else if (this.innerHTML == '删除') {
            chrome.storage.sync.remove(document.querySelector('#programName').value, function () {
                console.log('删除成功');
                flushNameList()
            });
            //删除数组里边的相应数据
            for (var i = 0; i < allProgram.length; i++) {
                if (Object.keys(allProgram[i])[0] == document.querySelector('#programName').value) {
                    allProgram.splice(i, 1)
                    console.log('删除数组成功');
                    // if (allProgram.length > 0) {
                    //     document.querySelector('#btn').click()
                    // }
                }
            }
        }
    }

    // 创建包含文件上传按钮的 <label> 元素
    var customFileUploadLabel = document.createElement('label');
    customFileUploadLabel.className = 'custom-file-upload';
    customFileUploadLabel.textContent = '导入方案';
    customFileUploadLabel.style.flex = '1'
    customFileUploadLabel.id = 'custom-file-upload'

    // 创建实际的文件上传 <input> 元素
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput'
    fileInput.style.display = 'none'; // 隐藏默认的文件上传按钮

    // 将 <input> 添加到 <label> 中
    customFileUploadLabel.appendChild(fileInput);

    // 添加选定文件后的事件处理程序
    fileInput.addEventListener('change', function () {
        // 处理选定的文件，您可以在这里编写您的逻辑
        console.log('选定的文件：', fileInput.files);
        //获取文件内容
        var reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.onload = function (e) {
            console.log(e.target.result);
            var data = JSON.parse(e.target.result)  //转换为json对象
            console.log(data);
            allProgram = []
            for (var key in data) {
                allProgram.push({ [key]: data[key] })
            }

            //删除storage里的所有数据
            chrome.storage.sync.clear(function () {
                console.log('删除成功');
            });

            //重新存储到storage里
            for (var key in data) {
                var data1 = data[key]
                chrome.storage.sync.set({ [key]: data1 }, function () {
                    console.log('保存成功');
                    flushNameList()
                });
            }
        }

    });
    var input2 = document.createElement("input");
    input2.type = "text";
    input2.id = 'programName'
    input2.style = "margrn-left:10px; margrn-right:10px; width:100px; height:25px; background-color: rgba(255, 255, 255, 0);";
    input2.input = function () {
        console.log(input2.value);
    }

    //当鼠标进入这个input时，显示下拉列表
    input2.onmouseover = function () {
        document.querySelector('#myul').style.display = 'block'
        sh = 1
    }

    input2.onmouseout = function () {
        sh = 0
        setTimeout(function () {
            if (sh == 0) {
                document.querySelector('#myul').style.display = 'none'
            }
        }, 100)
    }



    //向这个元素的第二个子元素添加一个按钮
    while (!document.querySelector('#script_list > label')) {
        await sleep(100)
    }
    var containerElement = document.querySelector('#script_list > label')
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    div.style.display = 'flex'
    div.style.justifyContent = 'space-between'
    div2.style.flex = '1'
    div2.style.display = 'inline'
    div2.style.backgroundColor = 'transparent'
    div2.id = 'div2'
    div.id = 'div'
    containerElement.insertBefore(div, containerElement.firstChild.nextSibling);
    div.appendChild(document.createElement("button"))
    div.appendChild(btn2)
    div.appendChild(btn)
    div.appendChild(btn1)
    div2.appendChild(input2)
    div.appendChild(div2)
    div.appendChild(btn3)
    div.appendChild(customFileUploadLabel)
    // var btn4 = document.createComment('button')
    // btn4.style.width = '100px'
    // div.appendChild(btn4)
    var span = document.createElement('span')
    span.style = 'color:#808080'
    span.innerText = 'XYZPrestv1.0 by AIL/知筑社'
    span.style.fontSize = '12px'
    span.style.left = '0px'

    div.appendChild(span)


    // // 将按钮插入到第一个子元素后面
    // containerElement.insertBefore(customFileUploadLabel, containerElement.firstChild.nextSibling);
    // containerElement.insertBefore(btn3, containerElement.firstChild.nextSibling);
    // containerElement.insertBefore(input2, containerElement.firstChild.nextSibling);
    // containerElement.insertBefore(btn1, containerElement.firstChild.nextSibling);
    // containerElement.insertBefore(btn, containerElement.firstChild.nextSibling);
    // containerElement.insertBefore(btn2, containerElement.firstChild.nextSibling);
}
var a = '[ControlNet] Pre Resolution'
var b = 'AddNet UNet Weight 3'
var c = 'AddNet UNet Weight 4'
var value1 = 'a'
var value2 = 'b'
var value3 = 'c'

async function setValue(value, select) {
    while (document.querySelector('.options')) {
        await sleep(50)
    }
    console.log('等待元素出现');
    while (!document.querySelector(select)) {
        await sleep(50)
    }
    console.log('找到了');
    var input = document.querySelector(select)
    //把元素移到可见区域
    input.scrollIntoViewIfNeeded();
    //依次提交input获取光标触发的所有事件
    var event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('focus', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('focusin', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('select', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('click', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('mousedown', { bubbles: true });
    input.dispatchEvent(event);
    event = new Event('mouseup', { bubbles: true });
    input.dispatchEvent(event);
    // event = new Event('selectstart', { bubbles: true });
    // input.dispatchEvent(event);
    // event = new Event('selectionchange', { bubbles: true });
    // input.dispatchEvent(event);



    while (!document.querySelector('.options')) {
        await sleep(50)
    }
    // document.querySelector('.options').style.display = 'none'
    console.log(document.querySelector('.options'));
    while (!document.querySelector('[aria-label="' + value + '"]')) {
        console.log('等待元素出现');
        console.log(document.querySelector('[aria-label="' + value + '"]'));
        console.log(value);
        await sleep(50)
    }
    var element = document.querySelector('[aria-label="' + value + '"]')
    console.log(element);
    //鼠标进入事件
    var event = new MouseEvent('mouseover', { bubbles: true });
    element.dispatchEvent(event);
    //mousedown
    event = new MouseEvent('mousedown', { bubbles: true });
    element.dispatchEvent(event);
    //mouseup
    event = new MouseEvent('mouseup', { bubbles: true });
    element.dispatchEvent(event);
    //mouseenter
    // event = new MouseEvent('mouseenter', { bubbles: true });
    // element.dispatchEvent(event);
    //await sleep(20)
    //鼠标点击事件
    // event = new MouseEvent('click', { bubbles: true });
    // element.dispatchEvent(event);
}

window.onload = async function () {
    var names = []
    if (window.location.href.indexOf('imdo') != -1 || window.location.href.indexOf('localhost') != -1 || window.location.href.indexOf('127.0.0.1') != -1) {
        //读取storage里的所有数据,并存到allProgram数组里
        chrome.storage.sync.get(null, function (items) {
            console.log(items);
            for (var key in items) {
                allProgram.push({ [key]: items[key] })
                console.log(key);
                names.push(key)
            }
            return
        });
        while (!document.querySelector('#script_list > label > div > div.wrap-inner.svelte-aqlk7e > div > input')) {
            await sleep(100)
        }
        var ff = 0
        while (true) {
            if (document.querySelector('#script_list > label > div > div.wrap-inner.svelte-aqlk7e > div > input').value == 'X/Y/Z plot') {
                if (!document.querySelector('#div') && ff == 0)
                    await addbtn()
                if (!document.querySelector('#myul'))
                    nameList(names)
            } else {
                if (document.querySelector('#div')) {
                    ff = 0
                    document.querySelector('#div').remove()
                }
                if (document.querySelector('#myul')) {
                    document.querySelector('#myul').remove()
                }
            }
            await sleep(100)
        }
    }
    //addbtn()
}