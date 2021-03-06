/****************************************************************************
**
** Copyright (C) 2017 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the documentation of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:BSD$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see https://www.qt.io/terms-conditions. For further
** information use the contact form at https://www.qt.io/contact-us.
**
** BSD License Usage
** Alternatively, you may use this file under the terms of the BSD license
** as follows:
**
** "Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions are
** met:
**   * Redistributions of source code must retain the above copyright
**     notice, this list of conditions and the following disclaimer.
**   * Redistributions in binary form must reproduce the above copyright
**     notice, this list of conditions and the following disclaimer in
**     the documentation and/or other materials provided with the
**     distribution.
**   * Neither the name of The Qt Company Ltd nor the names of its
**     contributors may be used to endorse or promote products derived
**     from this software without specific prior written permission.
**
**
** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
** "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
** LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
** A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
** OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
** LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
** DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
** THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
** (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
** OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."
**
** $QT_END_LICENSE$
**
****************************************************************************/

function dbInit(name,version,description)
{
    var db = LocalStorage.openDatabaseSync(name, version, description, 1000000)
    try {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+ name +' (\
            createdDate text, \
            modifiedDate text, \
            processName text, \
            materialName text, \
            moldName text, \
            meteringTemp1 numeric, \
            meteringTemp2 numeric, \
            barrelTemp1 numeric, \
            barrelTemp2 numeric, \
            openPosition numeric, \
            clampTonnage numeric, \
            closeSpeed numeric, \
            openSpeed numeric, \
            ejectorDistance numeric, \
            ejectionSpeed numeric, \
            packTime numeric, \
            packPressure numeric, \
            transferPosition numeric, \
            injectionSpeed numeric, \
            injectionPressure numeric, \
            coolingTime numeric, \
            recoverySpeed numeric, \
            backPressure numeric, \
            recoveryPosition numeric)');

        })
    } catch (err) {
        console.log("Error creating table"+name+" in database: " + err)
    };

}

function dbGetHandle()
{
    try {
        var db = LocalStorage.openDatabaseSync("process_db", "",
                                               "Process Tracker", 1000000)
    } catch (err) {
        console.log("Error opening database: " + err)
    }
    return db
}

function dbGetInitHandle()
{
    try {
        var db = LocalStorage.openDatabaseSync("process_db_init", "",
                                               "Process Tracker", 1)
    } catch (err) {
        console.log("Error opening database: " + err)
    }
    return db
}

function dbInsert(createdDate,
                  modifiedDate,
                  processName,
                  materialName,
                  moldName,
                  meteringTemp1,
                  meteringTemp2,
                  barrelTemp1,
                  barrelTemp2,
                  openPosition,
                  clampTonnage,
                  closeSpeed,
                  openSpeed,
                  ejectorDistance,
                  ejectionSpeed,
                  packTime,
                  packPressure,
                  transferPosition,
                  injectionSpeed,
                  injectionPressure,
                  coolingTime,
                  recoverySpeed,
                  backPressure,
                  recoveryPosition)
{
    var db = dbGetHandle()
    var rowid = 0;
    db.transaction(function (tx) {
        var result = tx.executeSql('SELECT last_insert_rowid()')
        rowid = result.insertId
        tx.executeSql('INSERT INTO process_db VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                      [
                       createdDate,
                       modifiedDate,
                       processName,
                       materialName,
                       moldName,
                       meteringTemp1,
                       meteringTemp2,
                       barrelTemp1,
                       barrelTemp2,
                       openPosition,
                       clampTonnage,
                       closeSpeed,
                       openSpeed,
                       ejectorDistance,
                       ejectionSpeed,
                       packTime,
                       packPressure,
                       transferPosition,
                       injectionSpeed,
                       injectionPressure,
                       coolingTime,
                       recoverySpeed,
                       backPressure,
                       recoveryPosition])

    })
    return rowid;
}

function dbReadAll()
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT createdDate, \
                        modifiedDate, \
                        processName, \
                        materialName, \
                        moldName, \
                        meteringTemp1, \
                        meteringTemp2, \
                        barrelTemp1, \
                        barrelTemp2, \
                        openPosition, \
                        clampTonnage, \
                        closeSpeed, \
                        openSpeed, \
                        ejectorDistance, \
                        ejectionSpeed, \
                        packTime, \
                        packPressure, \
                        transferPosition, \
                        injectionSpeed, \
                        injectionPressure, \
                        coolingTime, \
                        recoverySpeed, \
                        backPressure, \
                        recoveryPosition FROM process_db order by createdDate desc');
        for (var i = 0; i < results.rows.length; i++) {
            listModel.append({
                createdDate: results.rows.item(i).createdDate,
                modifiedDate: results.rows.item(i).modifiedDate,
                processName: results.rows.item(i).processName,
                materialName: results.rows.item(i).materialName,
                moldName: results.rows.item(i).moldName,
                meteringTemp1: results.rows.item(i).meteringTemp1,
                meteringTemp2: results.rows.item(i).meteringTemp2,
                barrelTemp1: results.rows.item(i).barrelTemp1,
                barrelTemp2: results.rows.item(i).barrelTemp2,
                openPosition: results.rows.item(i).openPosition,
                clampTonnage: results.rows.item(i).clampTonnage,
                closeSpeed: results.rows.item(i).closeSpeed,
                openSpeed: results.rows.item(i).openSpeed,
                ejectorDistance: results.rows.item(i).ejectorDistance,
                ejectionSpeed: results.rows.item(i).ejectionSpeed,
                packTime: results.rows.item(i).packTime,
                packPressure: results.rows.item(i).packPressure,
                transferPosition: results.rows.item(i).transferPosition,
                injectionSpeed: results.rows.item(i).injectionSpeed,
                injectionPressure: results.rows.item(i).injectionPressure,
                coolingTime: results.rows.item(i).coolingTime,
                recoverySpeed: results.rows.item(i).recoverySpeed,
                backPressure: results.rows.item(i).backPressure,
                recoveryPosition: results.rows.item(i).recoveryPosition,
         })
        }
    })
}

function dbReadOne( rowId )
{
    var db = dbGetHandle()
    db.transaction(function (tx) {

    });
}

function dbGetLength(callback){
    var db = dbGetHandle();
    db.transaction(function (tx) {
        var result = tx.executeSql('SELECT createdDate FROM process_db');
        callback(result.rows.length);
    });
}

function dbUpdate(modifiedDate,
                  processName,
                  materialName,
                  moldName,
                  meteringTemp1,
                  meteringTemp2,
                  barrelTemp1,
                  barrelTemp2,
                  openPosition,
                  clampTonnage,
                  closeSpeed,
                  openSpeed,
                  ejectorDistance,
                  ejectionSpeed,
                  packTime,
                  packPressure,
                  transferPosition,
                  injectionSpeed,
                  injectionPressure,
                  coolingTime,
                  recoverySpeed,
                  backPressure,
                  recoveryPosition, Prowid)
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        tx.executeSql(
                    'UPDATE process_db SET \
                        modifiedDate = ?, \
                        processName = ?, \
                        materialName = ?, \
                        moldName = ?, \
                        meteringTemp1 = ?, \
                        meteringTemp2 = ?, \
                        barrelTemp1 = ?, \
                        barrelTemp2 = ?, \
                        openPosition = ?, \
                        clampTonnage = ?, \
                        closeSpeed = ?, \
                        openSpeed = ?, \
                        ejectorDistance = ?, \
                        ejectionSpeed = ?, \
                        packTime = ?, \
                        packPressure = ?, \
                        transferPosition = ?, \
                        injectionSpeed = ?, \
                        injectionPressure = ?, \
                        coolingTime = ?, \
                        recoverySpeed = ?, \
                        backPressure = ?, \
                        recoveryPosition WHERE id = ?', [
                                                            modifiedDate,
                                                            processName,
                                                            materialName,
                                                            moldName,
                                                            meteringTemp1,
                                                            meteringTemp2,
                                                            barrelTemp1,
                                                            barrelTemp2,
                                                            openPosition,
                                                            clampTonnage,
                                                            closeSpeed,
                                                            openSpeed,
                                                            ejectorDistance,
                                                            ejectionSpeed,
                                                            packTime,
                                                            packPressure,
                                                            transferPosition,
                                                            injectionSpeed,
                                                            injectionPressure,
                                                            coolingTime,
                                                            recoverySpeed,
                                                            backPressure,
                                                            recoveryPosition, Prowid])
    })
}

function dbDeleteRow(processName)
{
    var db = dbGetHandle()
    console.log("deleting " + processName);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM process_db WHERE processName = ?', [processName])
    })
}

function dbDeleteAll()
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE process_db');
    })
}

function defaultProcessUpdate(modifiedDate,
                  processName,
                  materialName,
                  moldName,
                  meteringTemp1,
                  meteringTemp2,
                  barrelTemp1,
                  barrelTemp2,
                  openPosition,
                  clampTonnage,
                  closeSpeed,
                  openSpeed,
                  ejectorDistance,
                  ejectionSpeed,
                  packTime,
                  packPressure,
                  transferPosition,
                  injectionSpeed,
                  injectionPressure,
                  coolingTime,
                  recoverySpeed,
                  backPressure,
                  recoveryPosition)
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        tx.executeSql('UPDATE process_db_init SET \
                        modifiedDate = ?, \
                        processName = ?, \
                        materialName = ?, \
                        moldName = ?, \
                        meteringTemp1 = ?, \
                        meteringTemp2 = ?, \
                        barrelTemp1 = ?, \
                        barrelTemp2 = ?, \
                        openPosition = ?, \
                        clampTonnage = ?, \
                        closeSpeed = ?, \
                        openSpeed = ?, \
                        ejectorDistance = ?, \
                        ejectionSpeed = ?, \
                        packTime = ?, \
                        packPressure = ?, \
                        transferPosition = ?, \
                        injectionSpeed = ?, \
                        injectionPressure = ?, \
                        coolingTime = ?, \
                        recoverySpeed = ?, \
                        backPressure = ?, \
                        recoveryPosition = ?, WHERE id = 0', [
                                                            modifiedDate,
                                                            processName,
                                                            materialName,
                                                            moldName,
                                                            meteringTemp1,
                                                            meteringTemp2,
                                                            barrelTemp1,
                                                            barrelTemp2,
                                                            openPosition,
                                                            clampTonnage,
                                                            closeSpeed,
                                                            openSpeed,
                                                            ejectorDistance,
                                                            ejectionSpeed,
                                                            packTime,
                                                            packPressure,
                                                            transferPosition,
                                                            injectionSpeed,
                                                            injectionPressure,
                                                            coolingTime,
                                                            recoverySpeed,
                                                            backPressure,
                                                            recoveryPosition, 0])
    })
}

