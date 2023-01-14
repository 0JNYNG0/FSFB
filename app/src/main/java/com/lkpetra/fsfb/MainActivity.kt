package com.lkpetra.fsfb

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.lkpetra.fsfb.alarm.AlarmFragment
import com.lkpetra.fsfb.calendar.CalendarFragment
import com.lkpetra.fsfb.databinding.ActivityMainBinding
import com.lkpetra.fsfb.home.HomeFragment
import com.lkpetra.fsfb.mine.MineFragment
import com.lkpetra.fsfb.todolist.TodolistFragment

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // BottomNavigationView 초기화 설정
        initBottomNavigationView()


    }

    private fun initBottomNavigationView() {
        val alarmFragment = AlarmFragment()
        val calendarFragment = CalendarFragment()
        val homeFragment = HomeFragment()
        val todolistFragment = TodolistFragment()
        val mineFragment = MineFragment()

        replaceFragment(homeFragment)
        binding.bottomNavigationView.selectedItemId = R.id.home

        binding.bottomNavigationView.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.alarm -> replaceFragment(alarmFragment)
                R.id.calendar -> replaceFragment(calendarFragment)
                R.id.home -> replaceFragment(homeFragment)
                R.id.toDoList -> replaceFragment(todolistFragment)
                R.id.mine -> replaceFragment(mineFragment)
            }
            true
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .apply {
                replace(R.id.fragmentContainer, fragment)
                commit()
            }
    }
}